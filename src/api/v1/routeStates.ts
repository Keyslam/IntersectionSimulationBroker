import RouteMask from "./routeMask";

type AutomobileRoute = {
    id: number;
    state: "GREEN" | "ORANGE" | "RED";
    open: boolean;
}

type CyclistRoute = {
    id: number;
    state: "GREEN" | "ORANGE" | "RED";
    open: boolean;
}

type PedestrianRoute = {
    id: number;
    state: "GREEN" | "BLINKING" | "RED";
    open: boolean;
}

type BoatRoute = {
    id: number;
    state: "GREEN" | "GREENRED" | "RED";
    open: boolean;
} 

type Route = {
    id: number;
    open: boolean;
} & (AutomobileRoute | CyclistRoute | PedestrianRoute | BoatRoute);

export default class RouteStates {
    private routeMask: RouteMask;

    private automobileRoutes: Map<number, AutomobileRoute>;
    private cyclistRoutes: Map<number, CyclistRoute>;
    private pedestrianRoutes: Map<number, PedestrianRoute>;
    private boatRoutes: Map<number, BoatRoute>;

    public constructor() {
        this.routeMask = new RouteMask();

        this.automobileRoutes = new Map();
        [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 15].forEach((routeId) => {
            this.automobileRoutes.set(routeId, {id: routeId, open: false, state: "RED"});
        })

        this.cyclistRoutes = new Map();
        [21, 22, 23, 24].forEach((routeId) => {
            this.cyclistRoutes.set(routeId, {id: routeId, open: false, state: "RED"});
        })

        this.pedestrianRoutes = new Map();
        [31, 32, 33, 34, 35, 36, 37, 38].forEach((routeId) => {
            this.pedestrianRoutes.set(routeId, {id: routeId, open: false, state: "RED"});
        })

        this.boatRoutes = new Map();
        [41, 42].forEach((routeId) => {
            this.boatRoutes.set(routeId, {id: routeId, open: false, state: "RED"});
        })
    }

    public CanAutomobileRouteStateTransition(routeId: number, state: "GREEN" | "ORANGE" | "RED") : boolean {
        const route = this.automobileRoutes.get(routeId)!;

        return (route.state == "GREEN" && state == "ORANGE") ||
            (route.state == "ORANGE" && state == "RED") ||
            (route.state == "RED" && state == "GREEN")
    }

    public SetAutomobileRouteState(routeId: number, state: "GREEN" | "ORANGE" | "RED") : number[] {
        const route = this.automobileRoutes.get(routeId)!;

        route.state = state;

        if (state == "RED") {
            route.open = false;
            return [];
        }

        route.open = true;

        return this.GetOverlaps(routeId);
    }

    public CanCyclistRouteStateTransition(routeId: number, state: "GREEN" | "ORANGE" | "RED") : boolean {
        const route = this.cyclistRoutes.get(routeId)!;

        return (route.state == "GREEN" && state == "ORANGE") ||
            (route.state == "ORANGE" && state == "RED") ||
            (route.state == "RED" && state == "GREEN")
    }


    public SetCyclistRouteState(routeId: number, state: "GREEN" | "ORANGE" | "RED") {
        const route = this.cyclistRoutes.get(routeId)!;

        route.state = state;

        if (state == "RED") {
            route.open = false;
            return [];
        }

        route.open = true;

        return this.GetOverlaps(routeId);
    }

    public CanPedestrianRouteStateTransition(routeId: number, state: "GREEN" | "BLINKING" | "RED") : boolean {
        const route = this.pedestrianRoutes.get(routeId)!;

        return (route.state == "GREEN" && state == "BLINKING") ||
            (route.state == "BLINKING" && state == "RED") ||
            (route.state == "RED" && state == "GREEN")
    }

    public SetPedestrianRouteState(routeId: number, state: "GREEN" | "BLINKING" | "RED") {
        const route = this.pedestrianRoutes.get(routeId)!;

        route.state = state;

        if (state == "RED") {
            route.open = false;
            return [];
        }

        route.open = true;

        return this.GetOverlaps(routeId);
    }

    public CanBoatRouteStateTransition(routeId: number, state: "GREEN" | "GREENRED" | "RED") : boolean {
        const route = this.boatRoutes.get(routeId)!;

        return (route.state == "RED" && state == "GREENRED") ||
            (route.state == "GREENRED" && state == "GREEN") ||
            (route.state == "GREEN" && state == "RED")
    }

    public SetBoatRouteState(routeId: number, state: "GREEN" | "GREENRED" | "RED") {
        const route = this.boatRoutes.get(routeId)!;

        route.state = state;

        if (state == "RED") {
            route.open = false;
            return [];
        }

        route.open = true;

        return this.GetOverlaps(routeId);
    }

    public GetOverlaps(routeId: number) : number[] {
        const mask = this.routeMask.getMask(routeId);

        return Array.from(mask.values()).filter((otherRouteId) => {
            const otherRoute = this.GetRoute(otherRouteId);
            if (otherRoute)
                return otherRoute!.open;
            
            return false;
        })
    }

    private GetRoute(routeId: number): Route | undefined {
        if (routeId > 0 && routeId <= 20) {
            return this.automobileRoutes.get(routeId)!;
        } else if (routeId > 20 && routeId <= 30) {
            return this.cyclistRoutes.get(routeId)!;
        } else if (routeId > 30 && routeId <= 40) {
            return this.pedestrianRoutes.get(routeId)!;
        } else if (routeId > 40 && routeId <= 50) {
            return this.boatRoutes.get(routeId)!;
        }

        return undefined;
    }
}