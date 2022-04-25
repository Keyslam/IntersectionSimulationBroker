import MessageSchema from "../../messageSchema";
import BoatRouteId from "./boatRouteId";

const SetBoatRouteState: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "SET_BOAT_ROUTE_STATE",
        },
        
        "data": {
            "type": "object",
            "properties": {
                "routeId": {
                    "type": "integer", 
                    "enum": [41, 42],
                },
                "state": {
                    "type": "string",
                    "enum": ["GREEN", "GREENRED", "RED"],
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

export type SetBoatRouteStateType = {
    eventType: "SET_BOAT_ROUTE_STATE",
    data: {
        routeId: BoatRouteId,
        state: "GREEN" | "GREENRED" | "RED"
    }
}


export default SetBoatRouteState;