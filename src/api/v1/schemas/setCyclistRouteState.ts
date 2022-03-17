import MessageSchema from "../../messageSchema";

const SetCyclistRouteState: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "SET_CYCLIST_TRAFFIC_LIGHTS",
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

export default SetCyclistRouteState;