const validar_campos = require('../middlewares/validar_campos');
const validarJWT = require('../middlewares/validar_jwt');
const tiene_role = require('../middlewares/validar_roles');

module.exports={
    ...validar_campos,
    ...validarJWT,
    ...tiene_role,

}