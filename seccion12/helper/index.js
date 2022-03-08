const dbValidator = require('../helper/db_validators.js');
const generarJWT = require('../helper/generar_jwt.js');
const googleVerify = require('../helper/google_verify.js');
const subirArchivo = require('../helper/subir_archivo.js');
module.exports = {
    ...dbValidator ,// Los 3 puntos permiten exportar todo el contenido de un elemento
    ...generarJWT ,
    ...googleVerify,
    ...subirArchivo,
}