export interface CargoResponse {
    ok: boolean;
    cargos: Cargo[];
}

export interface Cargo {
    id: number;
    descripcion: string;
}
