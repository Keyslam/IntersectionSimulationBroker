import MessageSchema from "../../messageSchema";

const SetAutomobileRouteState: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "SET_AUTOMOTIVE_TRAFFIC_LIGHTS",
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

export default SetAutomobileRouteState;