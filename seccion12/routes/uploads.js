const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validar_campos } = require('../middlewares/validar_campos');
const {cargar_archivo,actualizar_imagen,actualizar_imagen_cloudinary,mostrar_imagen}=require('../controllers/control_uploads');
const {coleccionesPermitidas}=require('../helper/db_validators');
const {comprobar_archivo } = require('../helper/db_validators');
router.post('/',[
    //MiddelWares de Control
    comprobar_archivo,
    validar_campos
],cargar_archivo);

router.put('/:coleccion/:id',[
    //Middelwares de control
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    comprobar_archivo,
    validar_campos
],//actualizar_imagen
actualizar_imagen_cloudinary)

router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validar_campos
],mostrar_imagen
)
module.exports= router;