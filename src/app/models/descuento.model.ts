export interface DescuentoRequest {
    ok: boolean;
    nominas: Nomina[];
}
export interface Nomina {
    id: number;
    descripcion: string;
    valor_porcentaje: number;
}