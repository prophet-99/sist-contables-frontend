export interface DescuentoRequest {
    ok: boolean;
    nominas: Nominas[];
}

export interface Nominas {
    id: number;
    descripcion: string;
    valor_porcentaje: number;
}