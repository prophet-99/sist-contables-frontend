export class UserAuth {
    constructor(
        public idEmpleado: number,
        public username: string,
        public nombres: string,
        public apellidos: string,
        public idRol: number,
        public rol: string,
        public id_rol ?: number,
        public id_empleado ?: number
    ){}
}