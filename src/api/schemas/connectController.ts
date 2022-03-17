import MessageSchema from "../messageSchema";

const ConnectController: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "CONNECT_CONTROLLER",
        },

        "data": {
            "type": "object",
            "properties": {
                "sessionName": {
                    "type": "string",
                },
        
                "sessionVersion": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 1,
                },

                "discardParseErrors": {
                    "type": "boolean",
                },
                "discardEventTypeErrors": {
                    "type": "boolean",
                },
                "discardMalformedDataErrors": {
                    "type": "boolean",
                },
                "discardInvalidStateErrors": {
                    "type": "boolean",
                }
            },

            "required": [
                "sessionName",
                "sessionVersion",

                "discardParseErrors",
                "discardEventTypeErrors",
                "discardMalformedDataErrors",
                "discardInvalidStateErrors",
            ],
            "additionalProperties": false
        }
    },

    "required": [
        "eventType",
        "data",
    ],
    "additionalProperties": false
};

export default ConnectController;