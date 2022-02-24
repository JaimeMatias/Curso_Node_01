const { request, response } = require('express');
const { status } = require('express/lib/response');
const bcryptjs =require('bcryptjs');

const Usuario = require('../models/usuario');


const usuarioGet = (req, res = response) => {
    const { nombre } = req.query;
    res.status(200).json({
        nombre,
        'msg': "Get API - Controlador",
    });
}


const usuarioPost = async (req = request, res = response) => {
    const {nombre,correo,Password,rol} = req.body;
    const salt=bcryptjs.genSaltSync();
    
    const usuario = new Usuario({nombre,correo,Password,rol});
    usuario.Password=bcryptjs.hashSync(Password,salt);
    await usuario.save();

    console.log(usuario);
    res.status(200).json({
        'msg': "Post API - ",
        usuario,
        salt
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id_usuario;
    res.status(200).json({
        id,
        'msg': "Put API - Controlador",
    });
}
const usuarioPatch = (req, res = response) => {
    res.status(200).json({
        'msg': "Patch API - Controlador",
    });
}

const usuariosDelete = (req, res = response) => {
    res.status(200).json({
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