const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { off } = require('../models/usuario');
const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x_token');
   
    if (!token) {
        return res.status(401).json({
            msg:'No hay token en la petición'
        })
        
    }
    try {
        const {id_usuario}=req.params;
        const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        if(id_usuario !=uid){
            throw 'El token pertenece a otro usuario'
        }
        
        next()
    } catch (error) {
        
        res.status(401).json({
            msg:error
        })    
    }
    
};

module.exports = { validarJWT } 