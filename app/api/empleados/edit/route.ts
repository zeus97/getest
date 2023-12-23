import Empleados from "@/models/Empleados";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest,res:NextResponse){
    try{
        await connectToDB();

        const empleado = await req.json();
        const empleadoID = empleado.id

        if(empleado && empleadoID){
            await Empleados.findByIdAndUpdate(empleadoID,empleado)
            console.log("Empleado actualizado")
            return new Response("Empleado actualizado",{status:200})
        }

        console.log("ID invalida")
        return new Response("ID invalida",{status:400})
        
        

    }catch(error){
        console.log(error)
        return new Response("Peticion invalida",{status:404})
    }
}