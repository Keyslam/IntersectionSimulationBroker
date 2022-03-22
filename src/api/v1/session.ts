import { Validator } from "jsonschema";
import { WebSocket, RawData } from "ws";
import Schemas from "./schemas";

export type SessionPreferences = {
    discardParseErrors: boolean,
    discardEventTypeErrors: boolean,
    discardMalformedDataErrors: boolean,
    discardInvalidStateErrors: boolean,
}

export default class Session {
    public readonly controller: WebSocket;
    public readonly simulation: WebSocket;

    public readonly schemas = Schemas;

    constructor(controller: WebSocket, simulation: WebSocket) {
        this.controller = controller;
        this.simulation = simulation;

        this.sendSessionStart();
    }

    private sendSessionStart(): void {
        const message = JSON.stringify({
            eventType: "SESSION_START",
        }); 

        this.controller.send(message);
        this.simulation.send(message);
    }

    private sendSessionStop(): void {
        const message = JSON.stringify({
            eventType: "SESSION_STOP",
        }); 

        this.controller.send(message);
        this.simulation.send(message);
    }

    public handleMessage(sender: WebSocket, message: any, messageRaw: string, discardInvalidStateErrors: boolean) {
        this.propagateMessage(sender, messageRaw);
    }

    public propagateMessage(sender: WebSocket, messageRaw: string) {
        if (sender == this.controller) {
            this.simulation.send(messageRaw);
        }

        if (sender == this.simulation) {
            this.controller.send(messageRaw);
        }
    }

    public end(): void {
        this.sendSessionStop();
    }
}