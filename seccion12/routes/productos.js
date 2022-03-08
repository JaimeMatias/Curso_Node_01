const { Router } = require('express');
const { listar_producto_id, listar_productos, actualizar_producto, eliminar_producto, crear_productos } = require('../controllers/control_producto')
const { validar_campos, validarJWT } = require('../middlewares');
const { comprobar_existencia_nombre, comprobar_existencia_nombre_producto,comprobar_existencia_id_producto,comprobar_usuario_administrado } = require('../helper/db_validators');
const { check } = require('express-validator');
const router = Router();
//Obtener todas las categorias - Publico
router.get('/', [
    validar_campos
], listar_productos
);

//Obtener una categoria por id - Publico
router.get('/:id', [
    check('id','El id provisto no pertenece a ningun Producto').isMongoId(),
    check('id').custom(comprobar_existencia_id_producto),
    validar_campos
], listar_producto_id
);

//Crear Categoria - privado - Cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre no puede estar vacio').not().isEmpty(),
    check('nombre').custom(comprobar_existencia_nombre_producto),
    check('categoria', 'La categoria no puede venir vacia').not().isEmpty(),
    check('categoria','La categoria no existe en la base de datos').not().custom(comprobar_existencia_nombre),

    validar_campos
], crear_productos
);

//Actualizar la categoria - privado - Cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id','El id provisto no pertenece a ningun Producto').isMongoId(),
    check('id').custom(comprobar_existencia_id_producto),
    check('nombre').custom(comprobar_existencia_nombre_producto),
    check('categoria','La categoria no existe en la base de datos').not().custom(comprobar_existencia_nombre),
    validar_campos
], actualizar_producto
);
//Borrar una categoria -privado- Admin
router.delete('/:id', [
    validarJWT,
    check('id','El id provisto no pertenece a ningun Producto').isMongoId(),
    check('id').custom(comprobar_existencia_id_producto),
    comprobar_usuario_administrado,
    validar_campos
], eliminar_producto
);


module.exports = router;