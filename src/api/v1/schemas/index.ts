import MessageSchema from "../../messageSchema";
import AcknowledgeBarriersState from "./acknowledgeBarriersState";
import AcknowledgeBridgeRoadEmpty from "./acknowledgeBridgeRoadEmpty";
import AcknowledgeBridgeState from "./acknowledgeBridgeState";
import AcknowledgeBridgeWaterEmpty from "./acknowledgeBridgeWaterEmpty";
import EntityEnteredZone from "./entityEnteredZone";
import EntityExitedZone from "./entityExitedZone";
import RequestBarriersState from "./requestBarriersState";
import RequestBridgeRoadEmpty from "./requestBridgeRoadEmpty";
import RequestBridgeState from "./requestBridgeState";
import RequestBridgeWaterEmpty from "./requestBridgeWaterEmpty";
import SetAutomobileRouteState from "./setAutomotiveRouteState";
import SetBoatRouteState from "./setBoatRouteState";
import SetBridgeWarningLightState from "./setBridgeWarningLightState";
import SetCyclistRouteState from "./setCyclistRouteState";
import SetPedestrianRouteState from "./setPedestrianRouteState";

const data : MessageSchema[] = [
    SetAutomobileRouteState,
    SetCyclistRouteState,
    SetPedestrianRouteState,
    SetBoatRouteState,
    SetBridgeWarningLightState,
    RequestBridgeState,
    RequestBarriersState,
    RequestBridgeRoadEmpty,
    RequestBridgeWaterEmpty,
    AcknowledgeBridgeState,
    AcknowledgeBarriersState,
    AcknowledgeBridgeRoadEmpty,
    AcknowledgeBridgeWaterEmpty,
    EntityEnteredZone,
    EntityExitedZone
]

const Schemas: Map<string, MessageSchema> = new Map();

data.forEach((schema) => {
    Schemas.set(schema.properties.eventType.const, schema);
})

export default Schemas;