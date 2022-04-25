import MessageSchema from "../../messageSchema";
import AutomobileRouteId from "./automobileRouteId";
import BoatRouteId from "./boatRouteId";
import CyclistRouteId from "./cyclistRouteId";
import PedestrianRouteId from "./pedestrianRouteId";

const EntityExitedZone: MessageSchema = {
    "type": "object",
    "properties": {
        "eventType": {
            "type": "string",
            "const": "ENTITY_EXITED_ZONE",
        },
        
        "data": {
            "type": "object",
            "properties": {
                "routeId": {
                    "type": "integer",
                    "enum": [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 15, 21, 22, 23, 24, 31, 32, 33, 34, 35, 36, 37, 38, 41, 42],
                },
                "sensorId": {
                    "type": "integer",
                    "enum": [1, 2, 3, 4],
                }
            },

            "required": [
                "routeId",
                "sensorId",
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

export type EntityExitedZoneType = {
    eventType: "ENTITY_EXITED_ZONE",
    data: {
        routeId: AutomobileRouteId | CyclistRouteId | PedestrianRouteId | BoatRouteId,
        sensorId: 1 | 2 | 3 | 4,
    }
}

export default EntityExitedZone;