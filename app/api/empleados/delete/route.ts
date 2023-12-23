import Empleados from "@/models/Empleados";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,res:NextResponse){
    try{
        await connectToDB();

        const empleadoID = await req.json()

        if(empleadoID){
            await Empleados.findByIdAndDelete(empleadoID)
            console.log("Empleado eliminado")
            return new Response("Empleado eliminado",{status:200})
        }

        console.log("ID invalida")
        return new Response("ID invalida",{status:400})
        
        

    }catch(error){
        console.log(error)
        return new Response("Peticion invalida",{status:404})
    }
}