const { Router } = require('express');
const {listar_producto_id,listar_productos,actualizar_producto,eliminar_producto,crear_productos}=require('../controllers/control_producto')
const router = Router();
//Obtener todas las categorias - Publico
router.get('/', [
],listar_productos
);

//Obtener una categoria por id - Publico
router.get('/:id', [
],listar_producto_id
);

//Crear Categoria - privado - Cualquier persona con un token valido
router.post('/', [
],crear_productos
);

//Actualizar la categoria - privado - Cualquiera con token valido
router.put('/:id', [
] ,actualizar_producto
);
//Borrar una categoria -privado- Admin
router.delete('/:id', [
] ,eliminar_producto
);


module.exports = router;