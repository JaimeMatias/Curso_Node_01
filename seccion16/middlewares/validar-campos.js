const { validationResult } = require('express-validator');


const validarCampos = ( req, res, next ) => {

    const errores = validationResult(req);
    const {errors}=errores
    console.log(errors)

    if( !errores.isEmpty() ){
        return res.status(405).json(errors);
    }

    next();
}



module.exports = {
    validarCampos
}
