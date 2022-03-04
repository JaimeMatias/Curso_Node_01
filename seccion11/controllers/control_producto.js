const { response, request } = require("express");
const { Producto, Categoria, Usuario } = require('../models');
const usuario = require("../models/usuario");
const { all } = require("../routes/auth");

const listar_productos = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const producto = await Producto.find({ estado: true })
        .limit(limite)
        .skip(desde)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    res.status(201).json({
        msg: 'Listar Productos',
        limite,
        desde,
        producto,

    })
};

const listar_producto_id = async (req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');
    res.status(201).json({
        msg: 'Listar Producto',
        producto
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
    const { nombre, categoria, precio, descripcion, disponible } = req.body
    const { id } = req.params
    const id_usuario = req.body_autenticado.id
    const bloque = { nombre:nombre.toUpperCase(),usuario: id_usuario, precio, descripcion, disponible }
    if(categoria!=null){
        const categoriaM = await Categoria.findOne({ nombre: categoria.toUpperCase() });
        
        bloque['categoria']=categoriaM._id
    }
    
    await Producto.findByIdAndUpdate(id, bloque)

    res.status(201).json({
        msg: 'Producto Actualizado',
      
        bloque,


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