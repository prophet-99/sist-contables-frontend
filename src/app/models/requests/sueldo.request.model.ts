export interface SueldoRequest {
    id: number;
    cantidad: number;
    fechaPago: Date;
    idEmpleado: number;
    idNumeroCuenta: string;
    saldoBruto: number;
    fechaNomina: Date;
    idDescuento: number;
}