export interface RegistrarCompraRequest {
    numeroOrden: string;
    descripcion: string;
    fechaPedido: string;
    fechaEsperada: string;
    precioTotalEsperado: number;
    idProveedor: number;
    idEmpleado: number;
    idVerificarDisponibilidad: number;
}