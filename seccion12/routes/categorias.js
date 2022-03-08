const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validar_campos, validarJWT } = require('../middlewares');
const {comprobar_categoria_id,comprobar_existencia_nombre,comprobar_usuario_administrado}=require('../helper/db_validators')
const { crear_categoria, listar_categoria,listar_categoria_especifica,actualizar_categoria,eliminar_categoria } = require('../controllers/control_categoria');


// router.post('/login',[
//     check('correo', 'El correo no es válido').isEmail(),
//     //check('correo').custom(comprobar_email),//Le paso el parametro correo
//     check('Password', 'La contraseña no es válida').not().isEmpty(),
//     validar_campos
// ],);

//Obtener todas las categorias - Publico
router.get('/', [
    validar_campos
], listar_categoria
);

//Obtener una categoria por id - Publico
router.get('/:id',[
    check('id','El id provisto no pertenece a ninguna categoria').isMongoId(),
    check('id').custom(comprobar_categoria_id),
    validar_campos

],listar_categoria_especifica 
);

//Crear Categoria - privado - Cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre no puede estár vacia').not().isEmpty(),
    check('nombre').custom(comprobar_existencia_nombre),
    check('estado', 'El estado no puede estár vacia').not().isEmpty(),
    validar_campos
], crear_categoria
);

//Actualizar la categoria - privado - Cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('id','El id provisto no pertenece a ninguna categoria').isMongoId(),
    check('nombre').custom(comprobar_existencia_nombre),
    check('id').custom(comprobar_categoria_id),
    validar_campos
] ,actualizar_categoria
);
//Borrar una categoria -privado- Admin
router.delete('/:id',[
    validarJWT,
    check('id','El id provisto no pertenece a ninguna categoria').isMongoId(),
    check('id').custom(comprobar_categoria_id),
    comprobar_usuario_administrado,
    validar_campos
] ,eliminar_categoria
);
module.exports = router;