import { Empleado, EmpleadosResponse, EmpleadosResponses } from "@/interfaces/Empleado.interface";




export const getEmpleados = async(page:number,id?:string,nombre?:string,cargo?:string):Promise<EmpleadosResponses | undefined>=>{
   
    const params: Record<string, string | number> = {
        page,
        ...(id && { id }),         
        ...(nombre && { nombre }), 
        ...(cargo && { cargo }),   
      };
      const queryParams = new URLSearchParams(params as Record<string, string>);
      const url = `/api/empleados?${queryParams.toString()}`;


    
        try{
            const response = await fetch(url);
            
            return response.json()
        }catch(error){
            console.log(error)
        }
  
};

export const createEmpleado = async (empleado:Empleado)=>{
try{
    const response = await fetch("/api/empleados/create",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(empleado)
    })

    return response
    
}catch(error){
    console.log(error)
}
};

export const deleteEmpleado = async (id:string)=>{
    try{
        const response = await fetch("/api/empleados/delete",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(id)
            

        })

        return response

    }catch(error){
        console.log(error)
    }
};

export const actualizarEstado = async (id:string)=>{
    try{
        const response = await fetch("/api/empleados/estatus",{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(id)
            

        })

        return response

    }catch(error){
        console.log(error)
    }
};
export const actualizarEmpleado = async (empleado:EmpleadosResponse)=>{
    try{
        const response = await fetch("/api/empleados/edit",{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(empleado)
            

        })

        return response

    }catch(error){
        console.log(error)
    }
};
