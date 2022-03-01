const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validar_campos } = require('../middlewares/validar_campos');
const{}=require('../controllers/control_categoria');

// router.post('/login',[
//     check('correo', 'El correo no es válido').isEmail(),
//     //check('correo').custom(comprobar_email),//Le paso el parametro correo
//     check('Password', 'La contraseña no es válida').not().isEmpty(),
//     validar_campos
// ],);

//Obtener todas las categorias - Publico
router.get('/',[
    check('categoria','La categoria no puede estár vacia').not().isEmpty(),
    validar_campos
],(req,res)=>{
    res.json({
        msg:'Categoria del ID tal'
    })});

//Obtener una categoria por id - Publico
router.get('/:id',(req,res)=>{
    res.json({
        msg:'Categoria del ID tal'
    })
}
);

//Crear Categoria - privado - Cualquier persona con un token valido
router.post('/',(req,res)=>{
    res.json({
        msg:'Categoria Creada'
    })
}
);

//Actualizar la categoria - privado - Cualquiera con token valido
router.put('/:id',(req,res)=>{
    res.json({
        msg:'Categoria actualizada'
    })
}
);
//Borrar una categoria - Admin
router.delete('/:id',(req,res)=>{
    res.json({
        msg:'Categoria eliminada'
    })
}
);
module.exports= router;