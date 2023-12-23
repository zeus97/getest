import { Schema, model, models } from 'mongoose';


    
    const EmpleadosSchema = new Schema({
        nombre:{
            type: String,
            required: [true, 'Nombre es requerido'],
            
        },
        fechaDeNacimiento:{
            type:Number,
            required:[true, 'Email is required']
        },
        edad:{
            type: Number,
            required:true,

        },
        estatus:{
            type:Boolean,
            required:true
        },
        cargo:{
            id:{
                type: Number,
                required:true
            }
            ,
            description:{
                type: String,
                required:true
            }
        }
    });

const Empleados = models.empleados || model("empleados", EmpleadosSchema);

export default Empleados;