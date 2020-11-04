export interface ProveedorResponse {
    ok: boolean;
    proveedores: Proveedor[];
}

export interface Proveedor {
    id: number;
    nombre: string;
    direccion: string;
    ruc: string;
    numero_cuenta: string;
    numero_envios_fallados: number;
    numero_envios_incompletos: number;
    observaciones_comerciales: string;
    plazo_entrega_id: number;
    plazo_entrega: string;
}