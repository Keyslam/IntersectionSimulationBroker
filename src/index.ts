import { WebSocketServer } from "ws";
import { Validator } from "jsonschema";
import { WebSocket, RawData } from "ws";
import Session, { SessionPreferences } from "./api/v1/session";
import Schemas from "./api/schemas";
import MessageSchema from "./api/messageSchema";
import Api from "./api";
import fs from "fs"
import { Message } from "./api/v1/schemas";

const sessionNamesStream = fs.createWriteStream("sessionNames.txt", {
    flags: "a"
});

const wss = new WebSocketServer({ port: 8080 });
const validator = new Validator();

const connections: Map<WebSocket, {
    websocket: WebSocket,
    sessionId: string,
    sessionPreferences: SessionPreferences,
    type: "CONTROLLER" | "SIMULATOR",
}> = new Map();

const sessions: Map<string, Session> = new Map();

function tryParse(message: string): [false, string] | [true, any] {
    try {
        const data = JSON.parse(message);
        return [true, data];
    } catch (error) {
        const message = (error as Error).message;
        return [false, message];
    }
}

function handleParseError(target: WebSocket, receivedMessage: string, exception: string) {
    const message = JSON.stringify({
        eventType: "ERROR_NOT_PARSEABLE",

        data: {
            receivedMessage: receivedMessage,
            exception: exception,
        },
    });

    target.send(message);
}

function handleUnknownEventType(target: WebSocket, receivedMessage: string, validEventTypes: string[]) {
    const message = JSON.stringify({
        eventType: "ERROR_UNKNOWN_EVENT_TYPE",

        data: {
            receivedMessage: receivedMessage,
            validEventTypes: validEventTypes,
        },
    });

    target.send(message);
}

function handleMalformedMessage(target: WebSocket, receivedMessage: string, errors: string[]) {
    const message = JSON.stringify({
        eventType: "ERROR_MALFORMED_MESSAGE",

        data: {
            receivedMessage: receivedMessage,
            errors: errors,
        },
    });

    target.send(message);
}

function handleInvalidState(target: WebSocket, receivedMessage: string, error: string) {
    const message = JSON.stringify({
        eventType: "ERROR_INVALID_STATE",

        data: {
            receivedMessage: receivedMessage,
            errors: error,
        },
    });

    target.send(message);
}

function handleMessage(target: WebSocket, messageRaw: RawData, session: Session | undefined, preferences: SessionPreferences): void {
    const message = messageRaw.toString();

    const [parseSuccess, dataOrError] = tryParse(message);

    if (!parseSuccess) {
        const error = dataOrError;
        handleParseError(target, message, error);

        if (!preferences.discardParseErrors)
            session?.propagateMessage(target, message);

        return;
    }

    const data = dataOrError;

    const schemas: Map<string, MessageSchema> = session ? session.schemas : Schemas;

    if (data.eventType == undefined || !schemas.has(data.eventType)) {
        handleUnknownEventType(target, message, [...schemas.keys()]);

        if (!preferences.discardEventTypeErrors)
            session?.propagateMessage(target, message);

        return;
    }

    const schema = schemas.get(data.eventType)!;

    const validation = validator.validate(data, schema);

    if (!validation.valid) {
        const errors = validation.errors.map((error) => {
            return `'${error.property}' ${error.message}`;
        });
        handleMalformedMessage(target, message, errors);

        if (!preferences.discardMalformedDataErrors)
            session?.propagateMessage(target, message);

        return;
    }

    if (session == undefined) {
        const sessionId = `v${data.data.sessionVersion}-${data.data.sessionName}`;
        const sessionPreferences: SessionPreferences = {
            discardParseErrors: data.data.discardParseErrors,
            discardEventTypeErrors: data.data.discardEventTypeErrors,
            discardMalformedDataErrors: data.data.discardMalformedDataErrors,
            discardInvalidStateErrors: data.data.discardInvalidStateErrors,
        };

        if (data.eventType == "CONNECT_CONTROLLER") {
            sessionNamesStream.write(`Controller connected to session ${sessionId}\n`);

            const controllerAlreadyConnected = Array.from(connections.values()).filter((connection) =>
                connection.sessionId == sessionId && connection.type == "CONTROLLER"
            ).length > 0;

            if (controllerAlreadyConnected) {
                handleInvalidState(target, message, "A controller is already connected to this session");

                return;
            }

            connections.set(target, {
                websocket: target,
                sessionId: sessionId,
                sessionPreferences: sessionPreferences,
                type: "CONTROLLER",
            });
        } else if (data.eventType == "CONNECT_SIMULATOR") {
            sessionNamesStream.write(`Simulator connected to session ${sessionId}\n`);

            const simulatorAlreadyConnected = Array.from(connections.values()).filter((connection) =>
                connection.sessionId == sessionId && connection.type == "SIMULATOR"
            ).length > 0;

            if (simulatorAlreadyConnected) {
                handleInvalidState(target, message, "A simulator is already connected to this session");

                return;
            }

            connections.set(target, {
                websocket: target,
                sessionId: sessionId,
                sessionPreferences: sessionPreferences,
                type: "SIMULATOR",
            });
        }

        const controller = Array.from(connections.values()).filter((connection) =>
            connection.sessionId == sessionId && connection.type == "CONTROLLER"
        )[0];
        const simulator = Array.from(connections.values()).filter((connection) =>
            connection.sessionId == sessionId && connection.type == "SIMULATOR"
        )[0];


        if (controller && simulator) {
            sessionNamesStream.write(`Started session ${sessionId}\n`);
            
            const session = Api[data.data.sessionVersion - 1](controller.websocket, simulator.websocket);
            sessions.set(sessionId, session);
        }
    } else {
        session.handleMessage(target, data, message, preferences.discardInvalidStateErrors);
    }
}

function closeConnection(wss: WebSocketServer, ws: WebSocket): void {
    try {
        let session: Session | undefined = undefined;
        const sessionId = connections.get(ws)?.sessionId;
        if (sessionId) {
            sessionNamesStream.write(`Disconnected from session ${sessionId}\n`);
            
            session = sessions.get(sessionId);
        }

        if (session) {
            session.end();
            sessions.delete(sessionId!);
        }

        connections.delete(ws);

        wss.clients.delete(ws);
        ws.removeAllListeners();
        ws.terminate();
    } catch (e) {

    }
}

wss.on("connection", (ws) => {
    /// @ts-ignore
    ws.isAlive = true;

    ws.on("message", (messageRaw) => {
        let session: Session | undefined = undefined;
        let preferences: SessionPreferences = connections.get(ws)?.sessionPreferences || {
            discardParseErrors: true,
            discardEventTypeErrors: true,
            discardMalformedDataErrors: true,
            discardInvalidStateErrors: true,
        }

        const sessionId = connections.get(ws)?.sessionId;
        if (sessionId) {
            session = sessions.get(sessionId);
        }

        handleMessage(ws, messageRaw, session, preferences);
    });

    ws.on("close", () => {
        closeConnection(wss, ws)
    })

    ws.on("error", () => {
        closeConnection(wss, ws)
    })

    ws.on("pong", () => {
        /// @ts-ignore
        ws.isAlive = true;
    })
});

setInterval(() => {
    const toRemove: WebSocket[] = [];

    wss.clients.forEach((ws) => {
        /// @ts-ignore
        if (!ws.isAlive) {
            toRemove.push(ws);
        } else {
            /// @ts-ignore
            ws.isAlive = false;
            ws.ping();
        }
    })

    toRemove.forEach((ws) => {
        closeConnection(wss, ws);
    })
}, 3000)