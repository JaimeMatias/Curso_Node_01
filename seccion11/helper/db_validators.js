const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria')
const rol_valido = async (rol = '') => {
    const existerol = await Role.findOne({ rol });
    if (!existerol) {
        throw new Error(`El rol ${rol} no está en la base de datos`)
    }
};
const rol_valido_put = async (rol = '') => {

    if (!rol) { //Pregunta si el no es vacio
        return
    } else {

        const existerol = await Role.findOne({ rol });
        if (!existerol) {
            throw new Error(`El rol ${rol} no está en la base de datos`)
        }
    }
};

const comprobar_email = async (correo = '') => {
    const existe_email = await Usuario.findOne({ correo });

    if (existe_email) {
        throw new Error(`El correo ${correo} ya existe`)
    }


};
const existe_id = async (id) => {

    try {
        const existe_usuario = await Usuario.findById(id);

        if (!existe_usuario) {
            throw new Error(`No corresponde a un ID valido`)
        }

    } catch (error) {
        throw new Error(error)

    }
};

const comprobar_categoria_id = async (id) => {
    
    console.log('El id utilizado es:',id);
      //console.log('La categoria',existe_categoria)

        const existe_categoria = await Categoria.findById(id);
        console.log(existe_categoria)
        if (!existe_categoria) {
            throw new Error(`No corresponde a un ID valido`)}
   
};

module.exports = {
    rol_valido,
    rol_valido_put,
    comprobar_email,
    existe_id,
    comprobar_categoria_id
}