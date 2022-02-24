const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();


const { usuarioGet, usuarioPost, usuarioPatch, usuariosDelete, usuariosPut } = require('../controllers/control_user');
const { validar_campos,} = require('../middlewares/validar_campos');
const {rol_valido,comprobar_email}=require('../helper/db_validators')

router.get('/', usuarioGet);
router.put('/:id_usuario', usuariosPut);
router.post('/', [
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(comprobar_email),//Le paso el parametro correo
    check('nombre','El nombre es obligatior').not().isEmpty(),
    check('Password','La contraseña debe ser de mas de 6 letras').isLength(6),
    check('rol').custom(rol_valido),//Le paso el parametro rol
    validar_campos, //Esta es la función que muestra un error si los campos ingresado son incorrecto, en caso de que no exista ningun errorva al post


], usuarioPost);
router.delete('/', usuariosDelete);
router.patch('/', usuarioPatch);

module.exports = router;