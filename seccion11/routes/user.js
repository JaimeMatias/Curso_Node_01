const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();


const { usuarioGet, usuarioPost, usuarioPatch, usuariosDelete, usuariosPut } = require('../controllers/control_user');
// const { validar_campos, } = require('../middlewares/validar_campos');
// const {validarJWT}=require('../middlewares/validar_jwt');
// const {tiene_role}=require('../middlewares/validar_roles');
const {validar_campos,validarJWT,tiene_role}=require('../middlewares');
const { rol_valido, rol_valido_put, comprobar_email, existe_id } = require('../helper/db_validators')

router.get('/', usuarioGet);
router.put('/:id_usuario'// id_usuario es el nombre con el defino la variable _id de la base de  Datos
 ,[
    check('id_usuario', 'No es in ID valid').isMongoId(),
    check('id_usuario').custom(existe_id),
    check('rol').custom(rol_valido_put),
    validar_campos,
], usuariosPut);
router.post('/', [
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(comprobar_email),//Le paso el parametro correo
    check('nombre', 'El nombre es obligatior').not().isEmpty(),
    check('edad', 'La edad es obligatoria').not().isEmpty(),
    check('Password', 'La contraseña debe ser de mas de 6 letras').isLength(6),
    check('rol').custom(rol_valido),//Le paso el parametro rol
    validar_campos, //Esta es la función que muestra un error si los campos ingresado son incorrecto, en caso de que no exista ningun errorva al post


], usuarioPost);

router.delete('/:id_usuario', [
    validarJWT,
    //admin_rol,
    tiene_role('ADMIN_ROLE','VENTAS_ROLE'),
    check('id_usuario', 'No es in ID valid').isMongoId(),
    check('id_usuario').custom(existe_id),

    validar_campos,
    
], usuariosDelete);
router.patch('/', usuarioPatch);

module.exports = router;