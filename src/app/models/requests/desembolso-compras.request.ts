export interface DesembolsoComprasRequest {
    monto: number;
    fecha: Date | string;
    idEmpleado: number;
    idNumeroCuenta: string;
    idNumeroOrdenCompra: string;
    idCodigoFactura: string;
    idProveedor: number;
};