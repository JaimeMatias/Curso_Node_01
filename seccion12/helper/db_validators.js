const { response, request } = require('express');

const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria')
const Producto=require('../models/producto')
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
        throw new Error(`No corresponde a un ID valido`)

    }
};

const comprobar_categoria_id = async (id) => {

    try {
        const existe_categoria = await Categoria.findById(id);

        if (!existe_categoria) {
            throw new Error
        }

    } catch (error) {
        throw new Error(`No corresponde a un valor valido`)

    }
};

const comprobar_existencia_nombre = async (campo) => {

    const nombre = campo.toUpperCase();

    //Si el nombre del objeto es dintinto al nombre del atribut que busca, el findOne crashea,
    //Si busco por nombre, debe existir el atributo nombre en la colección
    const existe_nombre = await Categoria.findOne({ nombre });
    if (existe_nombre) {
        throw new Error(`La categoria ${campo.toUpperCase()} ya fue creada`);
    }
};

const comprobar_usuario_administrado = async (req = request, res = response, next) => {
    const { estado, rol } = req.body_autenticado;

    if (rol == 'ADMIN_ROLE') {
        if (!estado) {
            res.status(401).json({
                msg: 'Usuarios Deshabilitado'
            })
        } else { next() }
    } else {
        res.status(401).json({
            msg: 'Usuarios sin los permisos adecuados'
        })
    }
}

/*
METODOS MODDELO PRODUCTO
*/

const comprobar_existencia_nombre_producto = async (campo) => {
    const nombre = campo.toUpperCase();
    const existe_nombre = await Producto.findOne({ nombre });
  
    if (existe_nombre) {
        throw new Error(`El producto ${campo.toUpperCase()} ya está en la DB`);
    }
}

const comprobar_existencia_id_producto = async (id) => {
    const existe_nombre = await Producto.findById(id)
  
    if (!existe_nombre) {
        throw new Error(`El id del producto ingresa no existe en la DB`);
    }
}


module.exports = {
    rol_valido,
    rol_valido_put,
    comprobar_email,
    existe_id,
    comprobar_categoria_id,
    comprobar_existencia_nombre,
    comprobar_usuario_administrado,
    comprobar_existencia_nombre_producto,
    comprobar_existencia_id_producto
}