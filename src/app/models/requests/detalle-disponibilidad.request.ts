export interface DetalleDisponibilidadRequest {
    detalleItems: DetalleDisponibilidad[];
}

export interface DetalleDisponibilidad {
    idNumeroItem: string;
    idVerificarDisponibilidad: number;
    descripcion: string;
    reorden: boolean;
    cantidadSolicitada: number;
}