export interface DetalleOrdenRequest {
    ordenarItems: DetalleOrden[];
}

export interface DetalleOrden {
    idNumeroItem: string;
    idNumeroOrdenCompra: string;
    cantidad: number;
    precioUnitarioCompra: number;
}
