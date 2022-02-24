const Role= require('../models/role');
const rol_valido =async(rol='')=>{
    const existerol =await Role.findOne({rol});
    if (!existerol){
        throw new Error(`El rol ${rol} no está en la base de datos`)
    }
};

module.exports={rol_valido}