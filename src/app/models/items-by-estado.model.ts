export interface ItemsByEstado {
    ok: boolean;
    items: Item[];
}

export interface Item {
    numero_item: string;
    descripcion: string;
    ubicacion: string;
    punto_reorden: number;
    cantidad_disponible: number;
    estado_item: string;
}