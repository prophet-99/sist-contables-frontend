export interface TarjetaTiempoModel {
    tarjetasTiempo: TarjetasTiempo[];
}

export interface TarjetasTiempo {
    fechaRegistro: Date;
    horaInicio: string;
    horaFin: string;
    idEmpleado: number;
    idNominaSueldo: number;
}