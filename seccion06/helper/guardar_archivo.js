const fs = require('fs');

const ruta = './db/database.json';

const guardar_archivo = (datos) => {
    try {
        fs.writeFileSync(ruta, JSON.stringify(datos))

    } catch (error) {
        throw error
    }
}

const leer_archivo = () => {
    if (!fs.existsSync(ruta)) {
        return null;
    }
    const info = fs.readFileSync(ruta, { encoding: 'utf-8' });
    const data=JSON.parse(info);
   
    return data;
}

module.exports = {
    guardar_archivo,
    leer_archivo,
}