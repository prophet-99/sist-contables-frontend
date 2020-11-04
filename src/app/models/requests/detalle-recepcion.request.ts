export interface DetalleRecepcionRequest {
    detalleItems: DetalleRecepcion[];
}

export interface DetalleRecepcion {
    idNumeroItem: string;
    idNumeroComprobante: string;
    cantidadRecibida: number;
    costoUnitarioActual: number;
    observacion: string;
    estado_recepcion: boolean;
}