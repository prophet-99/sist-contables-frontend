export interface WelcomePagos {
    ok: boolean;
    nominas: Nomina[];
}

export interface Nomina {
    nombres: string;
    apellidos: string;
    tarifa_pago: number;
    valor_porcentaje: number;
    "SALDO NETO": number;
}