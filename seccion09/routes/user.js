const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();


const { usuarioGet, usuarioPost, usuarioPatch, usuariosDelete, usuariosPut } = require('../controllers/control_user');
const { validar_campos } = require('../middlewares/validar_campos');

router.get('/', usuarioGet);
router.put('/:id_usuario', usuariosPut);
router.post('/', [
    check('correo', 'El correo no es válido').isEmail(),
    check('nombre','El nombre es obligatior').not().isEmpty(),
    check('Password','La contraseña debe ser de mas de 6 letras').isLength(6),
    check('rol','No es un rol valido').isIn( ['ADMIN_ROLE', 'USER_ROLE']),
    validar_campos,


], usuarioPost);
router.delete('/', usuariosDelete);
router.patch('/', usuarioPatch);

module.exports = router;