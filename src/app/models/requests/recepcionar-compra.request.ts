export interface RecepcionarCompraRequest {
    numeroComprobante: string;
    fechaRecepcion: Date | string;
    montoAdeuda: string;
    transportista: string;
    numeroReciboInventario: string;
    idProveedor: number;
    idEmpleado: number;
    idNumeroOrdenCompra: string;
    idCodigoFactura: string;
}
