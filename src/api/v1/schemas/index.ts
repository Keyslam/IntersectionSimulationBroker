import MessageSchema from "../../messageSchema";
import AcknowledgeBarriersState, { AcknowledgeBarriersStateType } from "./acknowledgeBarriersState";
import AcknowledgeBridgeRoadEmpty, { AcknowledgeBridgeRoadEmptyType } from "./acknowledgeBridgeRoadEmpty";
import AcknowledgeBridgeState, { AcknowledgeBridgeStateType } from "./acknowledgeBridgeState";
import AcknowledgeBridgeWaterEmpty, { AcknowledgeBridgeWaterEmptyType } from "./acknowledgeBridgeWaterEmpty";
import EntityEnteredZone, { EntityEnteredZoneType } from "./entityEnteredZone";
import EntityExitedZone, { EntityExitedZoneType } from "./entityExitedZone";
import RequestBarriersState, { RequestBarriersStateType } from "./requestBarriersState";
import RequestBridgeRoadEmpty, { RequestBridgeRoadEmptyType } from "./requestBridgeRoadEmpty";
import RequestBridgeState, { RequestBridgeStateType } from "./requestBridgeState";
import RequestBridgeWaterEmpty, { RequestBridgeWaterEmptyType } from "./requestBridgeWaterEmpty";
import SetAutomobileRouteState, { SetAutomobileRouteStateType } from "./setAutomobileRouteState";
import SetBoatRouteState, { SetBoatRouteStateType } from "./setBoatRouteState";
import SetBridgeWarningLightState, { SetBridgeWarningLightStateType } from "./setBridgeWarningLightState";
import SetCyclistRouteState, { SetCyclistRouteStateType } from "./setCyclistRouteState";
import SetPedestrianRouteState, { SetPedestrianRouteStateType } from "./setPedestrianRouteState";

export type Message = 
    AcknowledgeBarriersStateType | 
    AcknowledgeBridgeRoadEmptyType |
    AcknowledgeBridgeStateType |
    AcknowledgeBridgeWaterEmptyType |
    EntityEnteredZoneType | 
    EntityExitedZoneType |
    RequestBarriersStateType |
    RequestBridgeRoadEmptyType |
    RequestBridgeStateType |
    RequestBridgeWaterEmptyType |
    SetAutomobileRouteStateType |
    SetBridgeWarningLightStateType |
    SetCyclistRouteStateType |
    SetPedestrianRouteStateType |
    SetBoatRouteStateType

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