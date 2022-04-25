import MessageSchema from "../../messageSchema";

const SetBridgeWarningLightState: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "SET_BRIDGE_WARNING_LIGHT_STATE",
        },
        
        "data": {
            "type": "object",
            "properties": {
                "state": {
                    "type": "string",
                    "enum": ["ON", "OFF"],
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

export type SetBridgeWarningLightStateType = {
    eventType: "SET_BRIDGE_WARNING_LIGHT_STATE",
    data: {
        state: "ON" | "OFF",
    }
}

export default SetBridgeWarningLightState;