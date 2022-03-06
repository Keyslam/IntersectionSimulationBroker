import MessageSchema from "./messageSchema";

const SetPedestrianTrafficLightsSchema: MessageSchema = {
    "type": "object",
    "properties": {
        "messageId": {
            "type": "integer", 
            "minimum": 0
        },

        "eventType": {
            "type": "string",
            "const": "SET_PEDESTRIAN_TRAFFIC_LIGHTS",
        },
        
        "data": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer", 
                    "minimum": 0
                },
                "state": {
                    "type": "string",
                    "enum": ["RED", "GREEN", "BLINKING"],
                }
            },

            "required": [
                "id",
                "state",
            ],
            "additionalProperties": false
        }
    },

    "required": [
        "messageId",
        "eventType",
        "data"
    ],
    "additionalProperties": false
};

export default SetPedestrianTrafficLightsSchema;