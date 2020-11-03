export interface EmpleadoRequest{
    id: number;
    dni: string;
    fechaNacimiento: string;
    fechaContratacion: string;
    nombres: string;
    apellidos: string;
    tarifaPago: number;
    email: string;
    idCargo: number;
}