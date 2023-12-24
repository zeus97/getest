"use client"
import { EmpleadosResponse } from '@/interfaces/Empleado.interface'
import { actualizarEstado, deleteEmpleado, getEmpleados } from '@/utils/services'
import React, {useState, useEffect} from 'react'
import './page.css'
import EditForm from '@/components/EditForm'
import PaginationComponent from '@/components/PaginationComponent'
import SearchForm from '@/components/SearchForm'

function  EmpleadosPage() {

    const [empleados, setEmpleados] = useState<EmpleadosResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [modalEditar, setModalEditar] = useState<boolean>(false);
    const [editValues, setEditValues] = useState({
      id:'',
      nombre:'',
      fechaDeNacimiento:'',
      cargo:1
    });
    const [searchParams, setSearchParams] = useState<any>({})

    

    //Pagination
    const [currentPage, setcurrentPage] = useState<number>(1);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);

    

    
    const fecthEmpleados = async (page:number,id?:string,nombre?:string,cargo?:string)=>{
      setIsLoading(true);
      getEmpleados(currentPage,id,nombre,cargo)
      .then((data)=>{
        if(data){
          setEmpleados(data.content);
          setTotalElements(data.totalElements);
          setPageSize(data.size);

        }
      }).catch((error)=>{console.log(error)})
      .finally(()=>{setIsLoading(false)})
    };

    const handleSearch = (params:any) => {
      // Actualizar el estado de los parámetros de búsqueda y volver a la primera página
      setSearchParams(params);
      setcurrentPage(1);
      fecthEmpleados(currentPage,params.searchID,params.searchNombre,params.searchCargo);
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
        fecthEmpleados(currentPage,searchParams.searchID,searchParams.searchNombre,searchParams.searchCargo);
        
    },[currentPage])

    if(isLoading){
      return (
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )
    }

  return (
    <section className='empleados-page'>
      <SearchForm
      onSearch={handleSearch}
      />
      {empleados.length <= 0  ?
      <h3 className='mt-3'>No hay resultados</h3>:
      
      <table className='mt-3 mb-3'>
        
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
                    fecthEmpleados(currentPage);
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
                    fecthEmpleados(currentPage);
                  }).catch((error)=>{console.log(error)})
                }}>cambiar estatus</td>
              </tr> 
              
              )
            })}

          </tbody>
        
        
      </table>
      }
      <PaginationComponent
      className='pagination-bar'
      currentPage={currentPage}
      totalCount={totalElements}
      siblingCount={1}
      pageSize={pageSize}
      onPageChange={(page)=>{setcurrentPage(page)}} />

      { modalEditar &&
        <div className='edit-modal'>
          <div className='edit-modal-box'>
            <i className="bi bi-x"
            onClick={()=>{setModalEditar(false)}}></i>
            <EditForm
            initialValues={editValues}
            closeModal={closeModal}
            updateTable={()=>fecthEmpleados(currentPage)} />

          </div>

        </div>
      }
    </section>
  )
}

export default EmpleadosPage