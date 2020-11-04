export interface CategoriaResponse {
    ok: boolean;
    categorias: Categoria[];
}

export interface Categoria {
    id: number;
    descripcion: string;
}