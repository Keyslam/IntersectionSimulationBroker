import MessageSchema from "./messageSchema";
import SetAutomotiveTrafficLightsSchema from "./setAutomotiveTrafficLight";
import SetPedestrianTrafficLightsSchema from "./setPedestrianTrafficLight";

const data : MessageSchema[] = [
    SetAutomotiveTrafficLightsSchema,
    SetPedestrianTrafficLightsSchema,
]

const Schemas: Map<string, MessageSchema> = new Map();

data.forEach((schema) => {
    Schemas.set(schema.properties.eventType.const, schema);
})

export default Schemas;