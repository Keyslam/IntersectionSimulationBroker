import MessageSchema from "../../messageSchema";
import AutomobileRouteId from "./automobileRouteId";

const SetAutomobileRouteState: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "SET_AUTOMOBILE_ROUTE_STATE",
        },
        
        "data": {
            "type": "object",
            "properties": {
                "routeId": {
                    "type": "integer", 
                    "enum": [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 15],
                },
                "state": {
                    "type": "string",
                    "enum": ["GREEN", "ORANGE", "RED"],
                }
            },

            "required": [
                "routeId",
                "state",
            ],
            "additionalProperties": false
        }
    },

    "required": [
        "eventType",
        "data"
    ],
    "additionalProperties": false
};

export type SetAutomobileRouteStateType = {
    eventType: "SET_AUTOMOBILE_ROUTE_STATE",
    data: {
        routeId: AutomobileRouteId,
        state: "GREEN" | "RED" | "ORANGE"
    }
}

export default SetAutomobileRouteState;