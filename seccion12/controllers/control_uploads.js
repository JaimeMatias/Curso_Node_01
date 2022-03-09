
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
//Autenticación de  Cloudinary
cloudinary.config(process.env.CLOUDINARY_URL);
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

    if (modelo.img) {
        const { img } = modelo
        const pathImage = path.join(__dirname, '../uploads', coleccion, img);
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage)
        }
    }
    const nombre = await subir_archivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();
    return res.json(modelo);
}



const cargar_archivo_cloudinary = async (req, res) => {


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


const actualizar_imagen_cloudinary = async (req, res) => {

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
    //Limpiar imagenes anteriores
    if (modelo.img) {
        const nombreArr=modelo.img.split('/');
        const nombre=nombreArr[nombreArr.length-1];
        const [public_id]=nombre.split('.');
        console.log(public_id)
        cloudinary.uploader.destroy(public_id);
    }
    const { tempFilePath } = req.files.archivo

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;
    await modelo.save();
    return res.json({
        modelo,
    });
}


const mostrar_imagen = async (req, res) => {
    const pathNoImage = path.join(__dirname, '../asset/no-image.jpg')
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.sendFile(pathNoImage)
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.sendFile(pathNoImage)
            }
            break;

        default:
            return res.sendFile(pathNoImage)
    }

    if (modelo.img) {
        const { img } = modelo
        const pathImage = path.join(__dirname, '../uploads', coleccion, img);
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage)
        }
    }


    return res.sendFile(pathNoImage)
}
module.exports = {
    cargar_archivo,
    actualizar_imagen,
    mostrar_imagen,
    actualizar_imagen_cloudinary,
    cargar_archivo_cloudinary

}