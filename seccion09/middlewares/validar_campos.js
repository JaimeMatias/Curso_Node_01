const { request, response } = require('express');

const {validationResult}=require('express-validator');


const validar_campos=(req,res,next)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors)
    };
    // Si la función llega hasta este punto, sigue al siguiente middleware, si no hay middleware, que vuelva al controladores,
    next();
}




module.exports={
    validar_campos,
    
}