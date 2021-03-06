import MessageSchema from "../../messageSchema";

const RequestBridgeRoadEmpty: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "REQUEST_BRIDGE_ROAD_EMPTY",
        },
    },

    "required": [
        "eventType",
    ],
    "additionalProperties": false
};

export type RequestBridgeRoadEmptyType = {
    eventType: "REQUEST_BRIDGE_ROAD_EMPTY"
}

export default RequestBridgeRoadEmpty;