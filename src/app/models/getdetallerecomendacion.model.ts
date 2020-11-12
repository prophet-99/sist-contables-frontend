export interface RecomendacionRespons {
    ok: boolean;
    recomendacion: Recomendacion[];
}

export interface Recomendacion {
    nombre: string;
    nombres: string;
    apellidos: string;
    numero_recomendacion: string;
    descripcion: string;
    id_verificar_disponibilidad: number;
    id_numero_cliente: number;
}