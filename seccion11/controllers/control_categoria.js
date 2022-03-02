const { response, request } = require("express");
const { handle } = require("express/lib/application");
const { Categoria, Usuario } = require("../models");


//MiddleWare encargado de controlar que la información enviada en los distintos metodos a la ruta Categoria cumplan 
//con todos los requerimientos definidos por el negocio

//obtenerCategorias - paginado - total -populate(toda la información del usuario)

//obtenerCategoria -populate{}

//actualizarcategoria

//borrar categoria - estado:false


const crear_categoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const nombre_usuario = req.body_autenticado.nombre;


    const cat = await Categoria.findOne({ nombre })

    if (cat) {
        return res.status(400).json({

            msg: `La categoria: ${cat.nombre} ya existe en la base de datos`
        })
    } else {
        const id = req.body_autenticado._id
        const arreglo_cat=req.body_autenticado.categoria

        const data_categoria = {
            nombre,
            usuario: id
        }

        const categoria_new = new Categoria(data_categoria);
        const cat_id = categoria_new._id
        //Guardar Categoria en Base de DATOSDB
        await categoria_new.save()
        
        if (arreglo_cat.length == 0) {
            const resto = { categoria: cat_id }

            await Usuario.findByIdAndUpdate(id, resto);
        } else {
            arreglo_cat.push(cat_id);            
            const resto = { categoria:arreglo_cat };
            await Usuario.findByIdAndUpdate(id, resto);
        }

     
        res.status(201).json({
            msg: 'Categoria Creada',
            data_categoria,
        })
    }
};
const listar_categoria = async (req = request, res = response) => {
    const { limite, desde } = req.query;

    const cat = await Categoria.find({ estado: true })
        .limit(limite)
        .skip(desde)
    //     .populate('usuario')
    //     .exec(function(err,Categoria){
    //         if (err) return handleError(err);
    //         console.log('El Usuario es %s',Categoria.usuario)
    //     })        ;


    res.status(201).json({
        msg: 'Categorias',

        cat,

    })

};

const listar_categoria_especifica = async (req = request, res = response) => {
    const { id } = req.params;

    const cate = await Categoria.findById(id).populate('usuario');
    
  
    res.status(201).json({
    
        msg: 'Categoria',
        cate,


    })
}

module.exports = {
    crear_categoria,
    listar_categoria,
    listar_categoria_especifica
}