export interface MenuAuth {
    staticFrontendMenuRef: StaticFrontendMenuRef[];
}

export interface StaticFrontendMenuRef {
    title: string;
    roles: number[];
    items: ItemMenu[];
}

export interface ItemMenu {
    title: string;
    icon: string;
    routes: RouteMenu[];
}

export interface RouteMenu {
    route: string;
    name: string;
}