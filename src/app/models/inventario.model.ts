export interface Inventario {
    ok: boolean;
    items: Item[];
}

export interface Item {
    numero_item: string;
    item: string;
    ubicacion: string;
    cantidad_disponible: number;
    punto_reorden: number;
    costo_unitario: number;
    tasa_uso: number;
    id_categoria: number;
    categoria: string;
}