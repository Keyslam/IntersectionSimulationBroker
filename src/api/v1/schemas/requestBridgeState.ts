import MessageSchema from "../../messageSchema";

const RequestBridgeState: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "REQUEST_BRIDGE_STATE",
        },
        
        "data": {
            "type": "object",
            "properties": {
                "state": {
                    "type": "string",
                    "enum": ["DOWN", "UP"],
                }
            },

            "required": [
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

export type RequestBridgeStateType = {
    eventType: "REQUEST_BRIDGE_STATE"
    data: {
        state: "DOWN" | "UP"
    }
}

export default RequestBridgeState;