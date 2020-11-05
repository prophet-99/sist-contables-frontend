export interface ObtenerTiempoRequest {
    tarjetasTiempo: ObtenerTiempo[];
}

export interface ObtenerTiempo {
    id: number;
    fechaRegistro: Date;
    horaInicio: string;
    horaFin: string;
    idEmpleado: number;
    idNominaSueldo: number;
    nominaSueldo: number;
}