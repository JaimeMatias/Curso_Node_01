const { Schema, model } = require('mongoose');
const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es obligatorio']
        
    },
    estado: {
        type: Boolean,
        default:true,
        required: [true,'El Estado es obligatorio']
        
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    },
    precio:{
        type:Number,
        default:0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'La categoria es obligatoria']
    },
    descripcion:{
        type:String
    },
    disponible:{
        type:Boolean,
        default:true
    },
    img:{
        type:String
    }

});

ProductoSchema.methods.toJSON=function() {
    
    const {_id,__v,estado,...resto}=this.toObject();
    const uid=_id;
    const producto={uid,...resto};
    
    return producto;
}
module.exports = model('Producto', ProductoSchema);