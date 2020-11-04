export interface ProveedorRequest {
    id: number;
    nombre: string;
    direccion: string;
    ruc: string;
    numeroCuenta: string;
    numeroEnviosFallados: number;
    numeroEnviosIncompletos: number;
    observacionesComerciales: string;
    idPlazoEntrega: number;
}