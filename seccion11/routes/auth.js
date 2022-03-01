const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { login,googleSignIn } = require('../controllers/control_auth');
const { validar_campos } = require('../middlewares/validar_campos');
const { comprobar_email } = require('../helper/db_validators')
router.post('/login',[
    check('correo', 'El correo no es válido').isEmail(),
    //check('correo').custom(comprobar_email),//Le paso el parametro correo
    check('Password', 'La contraseña no es válida').not().isEmpty(),
    validar_campos
],login );

router.post('/google',[
    check('id_token', 'id_token es necesario').not().isEmpty(),
    //check('correo').custom(comprobar_email),//Le paso el parametro correo
    
    validar_campos
],googleSignIn );


module.exports= router;