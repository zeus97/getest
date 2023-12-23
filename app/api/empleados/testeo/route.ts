import { EmpleadosResponse } from "@/interfaces/Empleado.interface";
import Empleados from "@/models/Empleados";
import { connectToDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";



export async function GET(req:NextApiRequest,res:NextApiResponse){

    const page = (req.query.page as string) || '1';
    const size = (req.query.size as string) || '10';
    const offset = (parseInt(page, 10) - 1) * parseInt(size, 10);
    try{
        await connectToDB();
        const totalElements = await Empleados.countDocuments();
        const totalPages = Math.ceil(totalElements / parseInt(size, 10));

        const empleadosArray = await Empleados
        .find()
        .skip(offset)
        .limit(parseInt(size, 10))
        .exec()

        const empleados: EmpleadosResponse[] = empleadosArray.map((e)=>{
            return {
                id:e._id.toString(),
                nombre:e.nombre,
                fechaDeNacimiento:e.fechaDeNacimiento,
                edad:e.edad,
                estatus:e.estatus,
                cargo:e.cargo
            }
        });

        const response = {
            content: empleados,
            pageable: {
              sort: {
                empty: false,
                sorted: true,
                unsorted: false,
              },
              offset,
              pageNumber: parseInt(page, 10) - 1,
              pageSize: parseInt(size, 10),
              paged: true,
              unpaged: false,
            },
            totalPages,
            totalElements,
            last: parseInt(page, 10) === totalPages,
            number: parseInt(page, 10) - 1,
            sort: {
              empty: false,
              sorted: true,
              unsorted: false,
            },
            size: parseInt(size, 10),
            numberOfElements: empleados.length,
            first: parseInt(page, 10) === 1,
            empty: false,
          };


        return new Response(JSON.stringify(response),{status:200})

    }catch(error){
        console.log(error);
        return new Response("Peticion invalida",{status:404})
    }

};