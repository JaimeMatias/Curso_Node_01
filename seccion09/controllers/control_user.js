const { response } = require('express');



const usuarioGet = (req, res = response) => {
    const {nombre}=req.query;
    res.status(200).json({
        nombre,
        'msg': "Get API - Controlador",
    });
}


const usuarioPost = (req, res = response) => {
    const body=req.body;
    
    res.status(200).json({
        'msg': "Post API - Controlador",
        body,
    });
}

const usuariosPut = (req, res = response) => {
    const id=req.params.id_usuario;
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