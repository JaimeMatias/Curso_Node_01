const { response, request } = require("express");
const { Producto, Categoria } = require('../models')

const listar_productos = async (req = request, res = response) => {
    const{limite,desde}=req.query;
    const producto = await Producto.find({estado:true})
    .limit(limite)
    .skip(desde)
    .populate('usuario','nombre')
    .populate('categoria','nombre');
    res.status(201).json({
        msg: 'Listar Productos',
        limite,
        desde,
        producto,

    })
};

const listar_producto_id = async (req = request, res = response) => {
    res.status(201).json({
        msg: 'Listar Producto',

    })
};

const crear_productos = async (req = request, res = response) => {
    const { _id } = req.body_autenticado;
    const { descripcion, precio } = req.body;
    const nombre = req.body.categoria.toUpperCase()

    const datos_cat = await Categoria.findOne({ nombre })
    const data_producto = {
        nombre: req.body.nombre.toUpperCase(),
        estado: true,
        usuario: _id,
        precio,
        categoria: datos_cat._id,
        descripcion,
        disponible: true
    }

    const producto_new = new Producto(data_producto);
        //Guardar Categoria en Base de DATOSDB
    await producto_new.save()
    res.status(201).json({
        msg: 'Producto Creado',
        producto_new


    })
};

const actualizar_producto = async (req = request, res = response) => {
    res.status(201).json({
        msg: 'Producto Actualizado',

    })
};


const eliminar_producto = async (req = request, res = response) => {
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