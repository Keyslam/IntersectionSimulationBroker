import MessageSchema from "../../messageSchema";

const AcknowledgeBarriersState: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "ACKNOWLEDGE_BARRIERS_STATE",
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

export type AcknowledgeBarriersStateType = {
    eventType: "ACKNOWLEDGE_BARRIERS_STATE",
    data: {
        state: "DOWN" | "UP"
    }
}

export default AcknowledgeBarriersState;