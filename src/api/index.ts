import Session from "./v1/session";
import { WebSocket } from "ws";

const Api: [(controller: WebSocket, simulation: WebSocket) => Session] = [
    (controller: WebSocket, simulation: WebSocket) => { 
        return new Session(controller, simulation)
    },
]

export default Api;