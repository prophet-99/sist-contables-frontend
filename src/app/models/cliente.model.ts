export interface Welcome {
    ok: boolean;
    clientes: Cliente[];
}

export interface Cliente {
    id: number;
    dni: string;
    nombre: string;
    direccion: string;
    celular: string;
    numero_cuenta: string;
    credito_disponible: number;
    credito_asignado: number;
}