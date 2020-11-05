export interface SueldosModels {
    ok: boolean;
    sueldos: Sueldos[];
}

export interface Sueldos {
    id: number;
    cantidad: number;
    fecha_pago: Date;
    id_empleado: number;
    id_numero_cuenta: string;
    saldo_bruto: number;
    fecha_nomina: Date;
    id_descuento: number;
}