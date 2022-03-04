const { request, response } = require('express');
const { Usuario } = require('../models');
const { ObjectId } = require('mongoose').Types

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];
const buscar_usuario = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        res.json({
            results:(usuario)?[usuario]:[]
        }
            
        )
    }else{  res.status(400).json({
        msg:'Elemento no encontrado'
    })}
}


const buscar = (req, res) => {
    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion.toLowerCase())) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }


    switch (coleccion) {
        case 'usuarios':
            buscar_usuario(termino,res);

            break;
        case 'categoria':

            break;
        case 'productos':

            break;
        default:
            res.status(500).json({
                msg: 'Busqueda no configurada',


            })

            break;

    }

};
module.exports = {
    buscar
}