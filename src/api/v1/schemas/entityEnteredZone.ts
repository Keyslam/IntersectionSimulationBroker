import MessageSchema from "../../messageSchema";

const EntityEnteredZone: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "ENTITY_ENTERED_ZONE",
        },
        
        "data": {
            "type": "object",
            "properties": {
                "routeId": {
                    "type": "number",
                },
                "sensorId": {
                    "type": "number",
                }
            },

            "required": [
                "routeId",
                "sensorId",
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

export default EntityEnteredZone;