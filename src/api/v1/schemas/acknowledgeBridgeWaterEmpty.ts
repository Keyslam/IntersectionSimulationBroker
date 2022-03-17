import MessageSchema from "../../messageSchema";

const AcknowledgeBridgeWaterEmpty: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "ACKNOWLEDGE_BRIDGE_WATER_EMPTY",
        },
    },

    "required": [
        "eventType",
    ],
    "additionalProperties": false
};

export default AcknowledgeBridgeWaterEmpty;