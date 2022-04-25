import MessageSchema from "../../messageSchema";
import CyclistRouteId from "./cyclistRouteId";

const SetCyclistRouteState: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "SET_CYCLIST_ROUTE_STATE",
        },
        
        "data": {
            "type": "object",
            "properties": {
                "routeId": {
                    "type": "integer", 
                    "enum": [21, 22, 23, 24],
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

export type SetCyclistRouteStateType = {
    eventType: "SET_CYCLIST_ROUTE_STATE",
    data: {
        routeId: CyclistRouteId,
        state: "GREEN" | "RED" | "ORANGE"
    }
}


export default SetCyclistRouteState;