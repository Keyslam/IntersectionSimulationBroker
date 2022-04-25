import MessageSchema from "../../messageSchema";

const AcknowledgeBridgeRoadEmpty: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "ACKNOWLEDGE_BRIDGE_ROAD_EMPTY",
        },
    },

    "required": [
        "eventType",
    ],
    "additionalProperties": false
};

export type AcknowledgeBridgeRoadEmptyType = {
    eventType: "ACKNOWLEDGE_BRIDGE_ROAD_EMPTY"
}

export default AcknowledgeBridgeRoadEmpty;