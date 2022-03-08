const { request, response } = require('express');
const { Usuario, Producto, Categoria } = require('../models');
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
        return res.json({
            results: (usuario) ? [usuario] : [] //Condicional Ternario, devuelte un usuario si hace match la condición, sinó devuelve vacio
        })
    }

    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find(
        //Condicionales en una busqueda Mongoose
        {
            $or: [{nombre:regex},{correo:regex}],
            $and:[{estado:true}]
        }
    );


}

const buscar_producto = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const producto = await Producto.findById(termino);
        return res.json({
            results: (producto) ? [producto] : [] //Condicional Ternario, devuelte un usuario si hace match la condición, sinó devuelve vacio
        })
    }

    const regex = new RegExp(termino, 'i');
    const producto = await Producto.find(
        //Condicionales en una busqueda Mongoose
        {
            $or: [{nombre:regex}],
            $and:[{estado:true}]
        }
    );
    return res.json({
        results: producto
    })
}

const buscar_categoria = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : [] //Condicional Ternario, devuelte un usuario si hace match la condición, sinó devuelve vacio
        })
    }

    const regex = new RegExp(termino, 'i');
    const categoria = await Categoria.find(
        //Condicionales en una busqueda Mongoose
        {
            $or: [{nombre:regex}],
            $and:[{estado:true}]
        }
    );
    return res.json({
        results: categoria
    })
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
            buscar_usuario(termino, res);

            break;
        case 'categoria':
            buscar_categoria(termino,res);
            break;
        case 'productos':
            buscar_producto(termino,res);
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