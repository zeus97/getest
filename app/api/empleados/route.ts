import { EmpleadosResponse } from "@/interfaces/Empleado.interface";
import Empleados from "@/models/Empleados";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest,res:NextResponse){
  let page = '1';
  let size = '10';

  const {searchParams} = new URL(req.url);
  let pageQuery = searchParams.get("page");
  if(pageQuery){page = pageQuery}
  let id = searchParams.get("id");
  let nombre = searchParams.get("nombre");
  let cargo = searchParams.get("cargo");
  


  const offset = (parseInt(page, 10) - 1) * parseInt(size, 10);


    try{
        await connectToDB();

        const filtro:any ={};
        if (id) filtro._id = id;
        if (nombre) filtro.nombre = nombre;
        if (cargo) filtro['cargo.id'] = cargo;
        

        const totalElements = await Empleados.countDocuments(filtro);
        const totalPages = Math.ceil(totalElements / parseInt(size, 10));

        const empleadosArray = await Empleados
        .find(filtro)
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
              pageNumber: parseInt(page, 10),
              pageSize: parseInt(size, 10),
              paged: true,
              unpaged: false,
            },
            totalPages,
            totalElements,
            last: parseInt(page, 10) === totalPages,
            number: parseInt(page, 10),
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