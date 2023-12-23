"use client"
import { EmpleadosResponse } from '@/interfaces/Empleado.interface'
import { actualizarEstado, deleteEmpleado, getEmpleados } from '@/utils/services'
import React, {useState, useEffect} from 'react'
import './page.css'
import EditForm from '@/components/EditForm'

function  EmpleadosPage() {

    const [empleados, setEmpleados] = useState<EmpleadosResponse[]>([]);
    const [modalEditar, setModalEditar] = useState<boolean>(false);
    const [editValues, setEditValues] = useState({
      id:'',
      nombre:'',
      fechaDeNacimiento:'',
      cargo:1
    })

    const fecthEmpleados = async ()=>{

      getEmpleados().then((data)=>{
        console.log(data)
        setEmpleados(data)})
    };

    const getFormattedDate = (date:number):string =>{
      const dateString = new Date(date);
      const formattedDate = dateString.toISOString().split('T')[0];
      return formattedDate
    };

    const closeModal = ()=>{
      setModalEditar(false);
    }


    useEffect(()=>{
        fecthEmpleados();
        console.log(empleados)
        
    },[])



  return (
    <section className='empleados-page'>
      <table className='mt-3'>
        
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Cargo</th>
              <th>Estatus</th>
              <th colSpan={3}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((e,i)=>{
              return (
              <tr key={i}>
                <td>{e.id}</td>
                <td>{e.nombre}</td>
                <td>{e.edad}</td>
                <td>{e.cargo.description}</td>
                <td>{e.estatus ? 'Activo':'Inactivo'}</td>
                <td className='editar-btn'
                onClick={()=>{
                  if(!e.estatus){
                    const fecha = getFormattedDate(e.fechaDeNacimiento)
                    setEditValues({
                      id:e.id,
                      nombre:e.nombre,
                      fechaDeNacimiento:fecha,
                      cargo:e.cargo.id
                    })
                    setModalEditar(true)}

                  }
                }
                >
                  Editar
                </td>
                <td className='eliminar-btn'
                onClick={()=>{
                  deleteEmpleado(e.id).then((res)=>{
                    alert("Empleado eliminado");
                    fecthEmpleados();
                  }).catch((error)=>{console.log(error)})
                  }
                }
                >
                  Eliminar
                </td>
                <td className='estatus-btn'
                onClick={()=>{
                  actualizarEstado(e.id).then((res)=>{
                    alert("Estatus actualizado");
                    fecthEmpleados();
                  }).catch((error)=>{console.log(error)})
                }}>cambiar estatus</td>
              </tr> 
              
              )
            })}

          </tbody>
        
        
      </table>
      { modalEditar &&
        <div className='edit-modal'>
          <div className='edit-modal-box'>
            <i className="bi bi-x"
            onClick={()=>{setModalEditar(false)}}></i>
            <EditForm
            initialValues={editValues}
            closeModal={closeModal}
            updateTable={fecthEmpleados} />

          </div>

        </div>
      }
    </section>
  )
}

export default EmpleadosPage