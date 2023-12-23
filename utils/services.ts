import { Empleado, EmpleadosResponse } from "@/interfaces/Empleado.interface";




export const getEmpleados = async()=>{
    try{
        const response = await fetch("/api/empleados");
        const data = response.json()
        return data
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
