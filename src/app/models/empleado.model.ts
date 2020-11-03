export interface EmpleadoResponse {
    ok: boolean;
    empleados: Empleado[];
}

export interface Empleado {
    id_empleado: number;
    dni: string;
    fecha_nacimiento: Date | string;
    fecha_contratacion: Date | string;
    nombres: string;
    apellidos: string;
    tarifa_pago: number;
    email: string;
    id_user: number | null;
    username: null | string;
    id_rol: number;
    rol: string;
}