const jwt = require('jsonwebtoken')


const generarjwt = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        },//calback metodo jwt.sign
         (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }
            else {
                resolve(token);
            }
        });

    })
}

module.exports = {
    generarjwt
}