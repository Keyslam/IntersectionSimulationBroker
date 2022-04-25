import MessageSchema from "../../messageSchema";

const RequestBridgeWaterEmpty: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "REQUEST_BRIDGE_WATER_EMPTY",
        },
    },

    "required": [
        "eventType",
    ],
    "additionalProperties": false
};

export type RequestBridgeWaterEmptyType = {
    eventType: "REQUEST_BRIDGE_WATER_EMPTY"
}

export default RequestBridgeWaterEmpty;