export class Empleado{
    nombre:string;
    fechaDeNacimiento:number;
    edad:number;
    estatus:boolean = true;
    Cargo:{
        id:number,
        description:string
    };

    constructor(nombre:string,
        fechaDeNacimiento:number,
        edad:number,
        Cargo:{id:number,description:string}){

            this.nombre = nombre;
            this.fechaDeNacimiento = fechaDeNacimiento;
            this.edad = edad;
            this.Cargo = Cargo;
    }
}