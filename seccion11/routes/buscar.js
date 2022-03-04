const { Router } = require('express');
const{buscar}=require('../controllers/control_buscar')

const router = Router();
router.get('/:coleccion/:termino',buscar)
module.exports = router;