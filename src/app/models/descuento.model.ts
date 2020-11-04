export interface DescuentoRequest {
    ok: boolean;
    nomina: Nominas[];
}
export interface Nominas {
    id: number;
    descripcion: string;
    valor_porcentaje: number;
}