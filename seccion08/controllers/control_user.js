const { response } = require('express');
const usuarioGet = (req, res = response) => {
    res.status(200).json({
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
    res.status(200).json({
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