export interface PlazoResponse {
    ok: boolean;
    plazos: Plazo[];
}

export interface Plazo {
    id: number;
    descripcion: string;
}