const Role= require('../models/role');
const Usuario = require('../models/usuario');
const rol_valido =async(rol='')=>{
    const existerol =await Role.findOne({rol});
    if (!existerol){
        throw new Error(`El rol ${rol} no está en la base de datos`)
    }
};

const comprobar_email =async (correo='')=>{
    const existe_email=await Usuario.findOne({correo});
    
    if (existe_email){
         throw new Error(`El correo ${correo} ya existe`)}


};

module.exports={rol_valido,comprobar_email}