export interface OrdenesCompraDetalleResponse {
    ok: boolean;
    items: OrdenCompraDetalle[];
}

export interface OrdenCompraDetalle {
    fechaEmision: Date;
    fecha_entrega_esperada: Date;
    proveedor: string;
    ruc: string;
    descripcion: string;
    id_numero_item: string;
    producto: string;
    cantidad_orden: number;
    precio_unitario_compra: number;
    precio_total_esperado: number;
    nombres: string;
    importe: number;
}