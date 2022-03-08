const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validar_campos } = require('../middlewares/validar_campos');
const {cargar_archivo,actualizar_imagen}=require('../controllers/control_uploads');
const {coleccionesPermitidas}=require('../helper/db_validators');
router.post('/',[
    //MiddelWares de Control
],cargar_archivo);

router.put('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validar_campos
],actualizar_imagen)
module.exports= router;