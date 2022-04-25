import MessageSchema from "../../messageSchema";

const RequestBarriersState: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "REQUEST_BARRIERS_STATE",
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

export type RequestBarriersStateType = {
    eventType: "REQUEST_BARRIERS_STATE"
    data: {
        state: "DOWN" | "UP"
    }
}

export default RequestBarriersState;