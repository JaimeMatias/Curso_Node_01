const { response } = require('express');
const path = require('path');
const { subir_archivo } = require('../helper');
const { Usuario, Producto } = require('../models')

const cargar_archivo = async (req, res) => {


    if (!req.files.archivo || !req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }
    try {
        const patCompleto = await subir_archivo(req.files, undefined, carpeta = 'imagenes');
        res.json({ patCompleto })

    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

const actualizar_imagen = async (req, res) => {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;


        default:
            return res.status(500).json({ msg: 'se me olvidó validar esto' })
    }

    const nombre=await subir_archivo(req.files, undefined, coleccion);
    modelo.img=nombre;
    await modelo.save();
    res.json(modelo);





    res.json({
        id,
        coleccion
    })
}

module.exports = {
    cargar_archivo,
    actualizar_imagen
}