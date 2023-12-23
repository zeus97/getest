import Empleados from "@/models/Empleados";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse){
    try{
        await connectToDB();

        const body = await req.json()

        if(body){
            await Empleados.create(body)
            console.log("Empleado registrado")
            return new Response("Empleado registrado",{status:200})
        }

        console.log("Informacion invalida")
        return new Response("Informacion invalida",{status:400})
        
        

    }catch(error){
        console.log(error)
        return new Response("Peticion invalida",{status:404})
    }
}