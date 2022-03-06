import { WebSocketServer } from "ws";
import { Validator } from "jsonschema";
import SetAutomotiveTrafficLightsSchema from "./api/v1/schemas/setAutomotiveTrafficLight";
import Schemas from "./api/v1/schemas";


const wss = new WebSocketServer({ port: 8080 });
const validator = new Validator();

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("Received: %s", message);

    try {
        const data = JSON.parse(message.toString());

        if (!data.eventType || Schemas.get(data.eventType) == undefined) {
            ws.send(JSON.stringify({
                eventType: "ERROR_UNKNOWN_EVENT_TYPE",
                data: {
                    receivedData: data,
                    validEventTypes: [...Schemas.keys()],
                }
            }));

            return;
        }
    
        const schema = Schemas.get(data.eventType)!;

        const validation = validator.validate(data, schema);

        console.log(validation.valid);

        if (!validation.valid) {
            const errors = validation.errors.map((error) => {
                return `'${error.property}' ${error.message}`;
            });
            
            ws.send(JSON.stringify({
                eventType: "VALIDATION_ERROR",
                data: {
                    receivedData: data,
                    errors: errors
                }
            }));

            return;
        }
    } catch (e) {
        console.log(e);
        ws.send(JSON.stringify({
            eventType: "PARSE_ERROR",
            data: {
                receivedMessage: message.toString(),
                exception: e,
            }
        }));
    }
  });
});