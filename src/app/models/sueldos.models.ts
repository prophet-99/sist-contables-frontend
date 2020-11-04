export interface SueldosModels {
    ok: boolean;
    sueldos: Sueldos[];
}

export interface Sueldos {
    id: number;
    cantidad: number;
    fechaPago: Date;
    id_empleado: number;
    idNumeroCuenta: string;
    saldo_bruto: number;
    fechaNomina: Date;
    idDescuento: number;
}