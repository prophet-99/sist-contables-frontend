export interface ItemRequest {
    numeroItem: string;
    descripcion: string;
    ubicacion: string;
    cantidadDiponible: number;
    puntoReorden: number;
    costoUnitario: number;
    tasaUso: number;
    idCategoria: number;
    action: string;
}
