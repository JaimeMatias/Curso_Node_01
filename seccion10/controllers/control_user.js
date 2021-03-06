const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');
const { validar_campos } = require('../middlewares/validar_campos')

//----------------GET-----------------------------
const usuarioGet = async (req = request, res = response) => {
    const { limite, desde } = req.query;

    //el Promise.all ejecuta un arreglo de promesas todas en simultaneo
    //const resp = await Promise.all ([
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .limit(limite)
            .skip(desde)

    ]);

    res.status(200).json({
        total,
        usuarios

    });
}

//----------------POST-----------------------------
const usuarioPost = async (req = request, res = response) => {

    const { nombre, correo, edad, Password, rol } = req.body;
    const salt = bcryptjs.genSaltSync();

    //Verificar si el correo existe


    //Encriptar la contraseña:
    const usuario = new Usuario({ nombre, correo, edad, Password, rol });
    usuario.Password = bcryptjs.hashSync(Password, salt);
    await usuario.save();

   
    res.status(200).json({
        'msg': "Post API - ",
        usuario,

    });
}

//----------------PUT-----------------------------
const usuariosPut = async (req, res = response) => {
    const id = req.params.id_usuario;
    const cuerpo=req.params;
    const { _id, Password, google, correo, ...resto } = req.query;
    if (Password) {
        const salt = bcryptjs.genSaltSync();
        resto.Password = bcryptjs.hashSync(Password, salt);
    }
    await Usuario.findByIdAndUpdate(id, resto);
    const usuario = await Usuario.findById(id);
    res.status(200).json({ msg: 'Usuario Actualizado', usuario,cuerpo });
}


//----------------PATCH-----------------------------
const usuarioPatch = (req, res = response) => {
    res.status(200).json({
        'msg': "Patch API - Controlador",
    });
}

//----------------DELETE-----------------------------
const usuariosDelete = async (req, res = response) => {
    const id = req.params.id_usuario;
    const { _id, Password, google, correo, ...resto } = req.body;
    //const usuario=await Usuario.findByIdAndDelete(id); //Borrado Fisico de la base de Datos
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }); //Borrado Logico de la base de Datos
    const usuario_autenticado= req.body_autenticado;
    res.status(200).json({
        id,
        usuario,
        usuario_autenticado,
        'msg': "Delete API - Controlador",
    });
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPatch,
    usuariosDelete,
    usuariosPut

}