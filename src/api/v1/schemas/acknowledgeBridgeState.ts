import MessageSchema from "../../messageSchema";

const AcknowledgeBridgeState: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "ACKNOWLEDGE_BRIDGE_STATE",
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

export type AcknowledgeBridgeStateType = {
    eventType: "ACKNOWLEDGE_BRIDGE_STATE",
    data: {
        state: "DOWN" | "UP",
    }
}

export default AcknowledgeBridgeState;