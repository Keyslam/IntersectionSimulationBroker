import MessageSchema from "../../messageSchema";

const SetBoatRouteSTate: MessageSchema = {
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

export default SetBoatRouteSTate;