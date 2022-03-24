const jwt = require('jsonwebtoken');
const {Usuario}=require('../models')


const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}


const comprobarJWT =async(token='')=>{
try {
    if(token.length<10){
        return null
    }
    const{uid}= jwt.verify(token,process.env.SECRETORPRIVATEKEY);//Extraigo el UID del token que recibo
    console.log ('El UID del usuario:',uid);
    const usuario= await Usuario.findById(uid);
    if (usuario){
        return usuario
    }else{
        return null
    }

} catch (error) {
    return error
}

}

module.exports = {
    generarJWT,
    comprobarJWT
}

