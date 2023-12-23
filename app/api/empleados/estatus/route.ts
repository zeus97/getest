import Empleados from "@/models/Empleados";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest,res:NextResponse){
    try{
        await connectToDB();

        const empleadoID = await req.json()

        if(empleadoID){
            await Empleados.findByIdAndUpdate(empleadoID,[{"$set": {estatus: {"$not": "$estatus"}}}])
            console.log("Estatus actualizado")
            return new Response("Estatus actualizado",{status:200})
        }

        console.log("ID invalida")
        return new Response("ID invalida",{status:400})
        
        

    }catch(error){
        console.log(error)
        return new Response("Peticion invalida",{status:404})
    }
}