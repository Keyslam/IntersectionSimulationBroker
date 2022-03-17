import { Schema } from "jsonschema";

type MessageSchema = {
    properties: {
        eventType: {
            const: string,
        }
    }
} & Schema

export default MessageSchema;