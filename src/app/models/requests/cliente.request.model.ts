export interface ClienteRequest {
    id: number;
    dni: string;
    nombre: string;
    direccion: string;
    celular: string;
    numeroCuenta: string;
    creditoDisponible: number;
    creditoAsignado: number;
}