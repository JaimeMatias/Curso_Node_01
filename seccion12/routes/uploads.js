const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validar_campos } = require('../middlewares/validar_campos');
const {cargar_archivo}=require('../controllers/control_uploads');

router.post('/',cargar_archivo);

module.exports= router;