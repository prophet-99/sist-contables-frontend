export interface DetalleRecomendacion{
    ok: boolean;
    items: Ite[];
}

export interface Ite {
    numero_recomendacion: string;
    recomendacion: string;
    fecha: Date;
    numero_item: string;
    item: string;
    cantidad_disponible: number;
    costo_unitario: number;
}