const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true,
    },
    edad:{
        type: String,
        require: [true, 'La edad es obligatoria'],
        
    },
    Password: {
        type: String,
        require: [true, 'La contraseña es obligatorio'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    estado: {
        type: Boolean,
        default: true,

    },
    google: {
        type: Boolean,
        default: false
    }

});

UsuarioSchema.methods.toJSON=function() {
    
    const {_id,__v,Password,...usuario}=this.toObject();
    const uid=_id;
    const USUario={uid,...usuario};
    
    return USUario;
}

module.exports = model('Usuario', UsuarioSchema);
