export interface Welcome {
    ok: boolean;
    nominas: NominasPagos[];
}

export interface NominasPagos {
    id: number;
    saldo_bruto: number;
    fecha: string;
    id_empleado: number;
    id_desembolso_efectivo: number;
    id_descuento: number;
}