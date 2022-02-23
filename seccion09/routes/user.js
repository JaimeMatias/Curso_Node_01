const { Router } = require('express');
const router = Router();

const { usuarioGet, usuarioPost, usuarioPatch, usuariosDelete, usuariosPut } = require('../controllers/control_user');

router.get('/', usuarioGet);
router.put('/:id_usuario', usuariosPut);
router.post('/', usuarioPost);
router.delete('/', usuariosDelete);
router.patch('/', usuarioPatch);

module.exports = router;