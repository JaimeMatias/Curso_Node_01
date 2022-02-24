const { request, response } = require('express');
const bcryptjs =require('bcryptjs');
const {validationResult}=require('express-validator');

const Usuario = require('../models/usuario');
const {validar_campos}=require('../middlewares/validar_campos')


const usuarioGet = (req, res = response) => {
    
    const { nombre } = req.query;
    res.status(200).json({
        nombre,
        'msg': "Get API - Controlador",
    });
}


const usuarioPost = async (req = request, res = response) => {
   
    const {nombre,correo,edad,Password,rol} = req.body;
    const salt=bcryptjs.genSaltSync();
    
    //Verificar si el correo existe

    
    //Encriptar la contraseña:
    const usuario = new Usuario({nombre,correo,edad,Password,rol});
    usuario.Password=bcryptjs.hashSync(Password,salt);
    await usuario.save();

    console.log(usuario);
    res.status(200).json({
        'msg': "Post API - ",
        usuario,
        
    });
}

const usuariosPut = async(req, res = response) => {
    const id = req.params.id_usuario;
    const {_id,Password,google,correo,...resto}=req.body;

    if (Password){
        const salt=bcryptjs.genSaltSync();
        resto.Password=bcryptjs.hashSync(Password,salt);
    }
    const usuario =await Usuario.findByIdAndUpdate(id,resto);
    res.status(200).json({
        'msg': "Put API - Controlador",
        usuario,
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