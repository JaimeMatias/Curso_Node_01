const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { login } = require('../controllers/control_auth');
const { validar_campos } = require('../middlewares/validar_campos');
const { comprobar_email } = require('../helper/db_validators')
router.post('/login',[
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(comprobar_email),//Le paso el parametro correo
    check('Password', 'La contraseña debe ser de mas de 6 letras').not().isEmpty(),
    validar_campos
],login );


module.exports= router;