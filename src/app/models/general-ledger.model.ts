export interface GeneralLedgerResponse {
    ok: boolean;
    libroMayor: GeneralLedger[];
}

export interface GeneralLedger {
    fecha_pago: Date;
    cantidad: number;
    numero_cuenta: string;
    descripcion: string;
    debe: number;
    haber: number;
}
