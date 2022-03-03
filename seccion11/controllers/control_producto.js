const { response, request } = require("express");
const { Producto } = require('../models')

const listar_productos = async(req = request,res = response ) =>{
    res.status(201).json({
        msg: 'Listar Productos',

    })
};

const listar_producto_id = async(req = request,res = response) =>{
    res.status(201).json({
        msg: 'Listar Producto',

    })
};

const crear_productos = async(req = request,res = response) =>{
    res.status(201).json({
        msg: 'Producto Creado',

    })
};

const actualizar_producto = async(req = request,res = response) =>{
    res.status(201).json({
        msg: 'Producto Actualizado',

    })
};


const eliminar_producto = async(req = request,res = response) =>{
    res.status(201).json({
        msg: 'Productos Eliminado',

    })
};

module.exports = {
    listar_productos,
    listar_producto_id,
    crear_productos,
    actualizar_producto,
    eliminar_producto,
}