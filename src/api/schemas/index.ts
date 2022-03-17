import ConnectController from "./connectController";
import ConnectSimulator from "./connectSimulator";
import MessageSchema from "../messageSchema";

const data : MessageSchema[] = [
    ConnectController,
    ConnectSimulator,
]

const Schemas: Map<string, MessageSchema> = new Map();

data.forEach((schema) => {
    Schemas.set(schema.properties.eventType.const, schema);
})

export default Schemas;