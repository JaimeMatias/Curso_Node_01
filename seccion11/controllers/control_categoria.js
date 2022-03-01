const { response, request } = require("express");
const { Categoria } = require("../models")

//MiddleWare encargado de controlar que la información enviada en los distintos metodos a la ruta Categoria cumplan 
//con todos los requerimientos definidos por el negocio
const crear_categoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const cat = await Categoria.findOne({ nombre });

    if (cat ) {
        return res.status(400).json({

            msg: `La categoria: ${cat.nombre} ya existe en la base de datos`
        })
    } else {
        const data = {
            nombre,
            usuario: req.body_autenticado._id

        }
        const categoria=new Categoria(data);
        //Guardar Categoria en Base de DATOSDB
        await categoria.save()

        res.status(201).json({
            msg: 'Categoria Creada',
            categoria
        })
    }
}


module.exports = {
    crear_categoria
}