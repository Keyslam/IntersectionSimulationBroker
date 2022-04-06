import { Validator } from "jsonschema";
import { WebSocket, RawData } from "ws";
import RouteMask from "./routeMask";
import RouteStates from "./routeStates";
import Schemas from "./schemas";

export type SessionPreferences = {
    discardParseErrors: boolean,
    discardEventTypeErrors: boolean,
    discardMalformedDataErrors: boolean,
    discardInvalidStateErrors: boolean,
}

export default class Session {
    private readonly routeStates: RouteStates;

    public readonly controller: WebSocket;
    public readonly simulation: WebSocket;

    public readonly schemas = Schemas;

    constructor(controller: WebSocket, simulation: WebSocket) {
        this.routeStates = new RouteStates();

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
        switch (message.eventType) {
            case "SET_AUTOMOBILE_ROUTE_STATE": {
                if (!this.routeStates.CanAutomobileRouteStateTransition(message.data.routeId, message.data.state)) {
                    this.sendInvalidStateErrorInvalidTransition(sender, message.data.routeId, messageRaw);
                    if (discardInvalidStateErrors) return;
                }

                const overlaps = this.routeStates.SetAutomobileRouteState(message.data.routeId, message.data.state);

                if (overlaps.length > 0) {
                    this.sendInvalidStateErrorOverlaps(sender, message.data.routeId, overlaps, messageRaw);
                    if (discardInvalidStateErrors) return;
                }

                break;
            }
            case "SET_CYCLIST_ROUTE_STATE": {
                if (!this.routeStates.CanCyclistRouteStateTransition(message.data.routeId, message.data.state)) {
                    this.sendInvalidStateErrorInvalidTransition(sender, message.data.routeId, messageRaw);
                    if (discardInvalidStateErrors) return;
                }

                const overlaps = this.routeStates.SetCyclistRouteState(message.data.routeId, message.data.state);

                if (overlaps.length > 0) {
                    this.sendInvalidStateErrorOverlaps(sender, message.data.routeId, overlaps, messageRaw);
                    if (discardInvalidStateErrors) return;
                }

                break;
            }
            case "SET_PEDESTRIAN_ROUTE_STATE": {
                if (!this.routeStates.CanPedestrianRouteStateTransition(message.data.routeId, message.data.state)) {
                    this.sendInvalidStateErrorInvalidTransition(sender, message.data.routeId, messageRaw);
                    if (discardInvalidStateErrors) return;
                }

                const overlaps = this.routeStates.SetPedestrianRouteState(message.data.routeId, message.data.state);
                
                if (overlaps.length > 0) {
                    this.sendInvalidStateErrorOverlaps(sender, message.data.routeId, overlaps, messageRaw);
                    if (discardInvalidStateErrors) return;
                }
                
                break;
            }
            case "SET_BOAT_ROUTE_STATE": {
                if (!this.routeStates.CanBoatRouteStateTransition(message.data.routeId, message.data.state)) {
                    this.sendInvalidStateErrorInvalidTransition(sender, message.data.routeId, messageRaw);
                    if (discardInvalidStateErrors) return;
                }

                const overlaps = this.routeStates.SetBoatRouteState(message.data.routeId, message.data.state);
                
                if (overlaps.length > 0) {
                    this.sendInvalidStateErrorOverlaps(sender, message.data.routeId, overlaps, messageRaw);
                    if (discardInvalidStateErrors) return;
                }
                
                break;
            }
        }

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

    public sendInvalidStateErrorInvalidTransition(sender: WebSocket, routeId: number, receivedMessage: string) {
        const error = `Route '${routeId}' transition is invalid`
        
        const message = JSON.stringify({
            eventType: "ERROR_INVALID_STATE",

            receivedMessage: receivedMessage,
            error: error
        });
        
        sender.send(message);
    }

    public sendInvalidStateErrorOverlaps(sender: WebSocket, routeId: number, overlappingRoutes: number[], receivedMessage: string) {
        const error = `Route '${routeId}' state collides with route(s): ` + overlappingRoutes
            .map((route) => route.toString())
            .reduce((accumulator, route) => accumulator + ", " + route)
        
        const message = JSON.stringify({
            eventType: "ERROR_INVALID_STATE",

            receivedMessage: receivedMessage,
            error: error
        });
        
        sender.send(message);
    }

    public end(): void {
        this.sendSessionStop();
    }
}