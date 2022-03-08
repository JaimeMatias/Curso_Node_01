const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subir_archivo = async (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]


        if (!extensionesValidas.includes(extension)) {
            return reject(`La extesnión ${extension} no es permitida`)
        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }
            return resolve(`${nombreTemp}`)

        });
    });


}
module.exports = {
    subir_archivo
}