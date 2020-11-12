import { Nominas } from './descuento.model';

export interface NominaRespons {
    ok: boolean;
    nominas: Nomi[];
}

export interface Nomi {
    id: number;
    nombres: string;
    apellidos: string;
    fecha_registro: Date;
    hora_inicio: string;
    hora_fin: string;
}