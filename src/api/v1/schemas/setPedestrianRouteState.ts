import MessageSchema from "../../messageSchema";
import PedestrianRouteId from "./pedestrianRouteId";

const SetPedestrianRouteState: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "SET_PEDESTRIAN_ROUTE_STATE",
        },
        
        "data": {
            "type": "object",
            "properties": {
                "routeId": {
                    "type": "integer", 
                    "enum": [31, 32, 33, 34, 35, 36, 37, 38],
                },
                "state": {
                    "type": "string",
                    "enum": ["GREEN", "BLINKING", "RED"],
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

export type SetPedestrianRouteStateType = {
    eventType: "SET_PEDESTRIAN_ROUTE_STATE",
    data: {
        routeId: PedestrianRouteId,
        state: "GREEN" | "RED" | "BLINKING"
    }
}

export default SetPedestrianRouteState;