export interface OrdenesCompraResponse {
    ok: boolean;
    items: OrdenCompra[];
}

export interface OrdenCompra {
    numero_orden_compra: string;
    fecha_pedido: Date;
    fecha_entrega_esperada: Date;
    proveedor: string;
    ruc: string;
    descripcion: string;
    precio_total_esperado: number;
    id_empleado: number;
    empleado: string;
    id_cargo: number;
    proveedor_factura: string;
    id_proveedor: number;
    pago: number;
}
