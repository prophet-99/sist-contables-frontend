export interface ItemsByEstadoResponse {
    ok: boolean;
    items: ItemByEstado[];
}

export interface ItemByEstado {
    numero_item: string;
    descripcion: string;
    ubicacion: string;
    punto_reorden: number;
    cantidad_disponible: number;
    estado_item: string;
}