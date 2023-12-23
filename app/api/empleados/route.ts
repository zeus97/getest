import { EmpleadosResponse } from "@/interfaces/Empleado.interface";
import Empleados from "@/models/Empleados";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,res:NextResponse){
    try{
        await connectToDB();
        const response = await Empleados.find({});

        const empleados: EmpleadosResponse[] = response.map((e)=>{
            return {
                id:e._id.toString(),
                nombre:e.nombre,
                fechaDeNacimiento:e.fechaDeNacimiento,
                edad:e.edad,
                estatus:e.estatus,
                cargo:e.cargo
            }
        });

        return new Response(JSON.stringify(empleados),{status:200})

    }catch(error){
        console.log(error);
        return new Response("Peticion invalida",{status:404})
    }

};