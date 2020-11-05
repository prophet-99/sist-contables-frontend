export interface NumeroCuenta {
    ok: boolean;
    nominas: Nomina[];
}

export interface Nomina {
    numero_cuenta: string;
    monto: number;
    descripcion: string;
}