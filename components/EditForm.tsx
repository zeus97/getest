"use client"
import React from 'react'
import {Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import '@/styles/EditForm.css'
import { actualizarEmpleado, createEmpleado } from '@/utils/services'
import { EmpleadosResponse } from '@/interfaces/Empleado.interface'

interface EmpleadoForm{
    initialValues:{
        id:string,
        nombre:string,
        fechaDeNacimiento:string,
        cargo:number

    },
    closeModal: ()=> void,
    updateTable: ()=> void
}

function EditForm({initialValues,closeModal,updateTable}:EmpleadoForm) {


  

  const validationSchema = yup.object().shape({
    nombre: yup.string().min(5,'Nombre muy corto').max(100,'Nombre muy largo').required("Ingresa tu nombre"),
    fechaDeNacimiento: yup.date().required("Ingresa tu fecha de nacimiento"),
    cargo: yup.number().required("Cargo requerido")
  });

  const calculateAge = (birthdate: string): {age:number,birthdateTimestamp:number} => {
    const birthdateDate = new Date(birthdate);
    const birthdateTimestamp = birthdateDate.getTime();
 
    const today = new Date();
    const age = Math.floor((today.getTime() - birthdateTimestamp) / (365.25 * 24 * 60 * 60 * 1000));
    
    return {age,birthdateTimestamp};
  };
  const getCargo = (cargo: string): string => {
    switch (cargo) {
      case '1':
        return 'Gerente';
      case '2':
        return 'Coordinador';
      case '3':
        return 'Subirector';
      default:
        return '';
    }
  };




  return (
    <Formik initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={async (values,actions)=>{
        const {age, birthdateTimestamp} = calculateAge(values.fechaDeNacimiento);
        const cargo = getCargo(values.cargo.toString())
        const updateEmpleado: EmpleadosResponse = {
        id:values.id,
        nombre:values.nombre,
        fechaDeNacimiento:birthdateTimestamp,
        edad:age,
        estatus:false,
        cargo:{
          id:values.cargo,
          description:cargo
        }
      };

      const response = await actualizarEmpleado(updateEmpleado);
      if(response && response.ok){alert("Empleado actualizado")}else{
        alert("Ocurrio un error")
      }

      closeModal();
      updateTable();
      

    }}>
      {
        ({errors, values, touched, handleSubmit, handleChange})=>{
          return (
            <Form onSubmit={handleSubmit} className='edit-form'>
              <h2 className='text-center mb-3'>Editar empleado</h2>
              <div className='edit-form-group'>
                <div>
                  <label htmlFor='nombre'>Nombre:</label>
                  <Field type='text'
                  value={values.nombre}
                  id='nombre'
                  name='nombre'
                  placeholder='Ingresa tu nombre'
                  onChange={handleChange}
                  className="form-control"
                   />

                </div>
                {errors.nombre && touched.nombre &&
                 <ErrorMessage name='nombre' component='p' className='error-msg' />}
              </div>
              <div className='edit-form-group'>
                <div>
                  <label htmlFor='fechaDeNacimiento'>Fecha:</label>
                  <Field type='date'
                  value={values.fechaDeNacimiento}
                  id='fechaDeNacimiento'
                  name='fechaDeNacimiento'
                  onChange={handleChange}
                  className="form-control" />

                </div>
                {errors.fechaDeNacimiento && touched.fechaDeNacimiento &&
                 <ErrorMessage name='fechaDeNacimiento' component='p' className='error-msg' />}
              </div>
              <div className='edit-form-group'>
                <div>
                  <label htmlFor='cargo'>Cargo:</label>
                  <select name='cargo'
                  value={values.cargo}
                  onChange={handleChange}
                  className="form-select">
                    <option value={1}>Gerente</option>
                    <option value={2}>Coordinador</option>
                    <option value={3}>Subdirector</option>
                  </select>

                </div>
                {errors.cargo && touched.cargo &&
                 <ErrorMessage name='cargo' component='p' className='error-msg' />}
              </div>

              <button type='submit'
              className='btn btn-primary align-self-center mt-3'>
                Editar
              </button>
            </Form>
          ) 
        }
      }

    </Formik>
    
  )
}

export default EditForm