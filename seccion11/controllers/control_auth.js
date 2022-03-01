const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarjwt } = require('../helper/generar_jwt');
const { google_verify } = require('../helper/google_verify');
const login = async (req = request, res = response) => {
    const { correo, Password } = req.body;
    try {


        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -correo'
            })
        } else {

            if (!usuario.estado) {
                return res.status(400).json({
                    msg: 'Usuario dado de baja de la base de datos'
                })
            };

            const valid_password = bcryptjs.compareSync(Password, usuario.Password);

            if (!valid_password) {
                return res.status(400).json({
                    msg: 'Contraseña Incorrecta',
                    valid_password
                })
            }
            const token = await generarjwt(usuario.id);
            res.json({
                msg: 'Login Exitoso!!!!',
                token

            })
        }




    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })

    }

}

const googleSignIn = async (req = request, res = response) => {
    //console.log(req)
    const { id_token } = req.body;
    try {
        const { nombre, img, correo } = await google_verify(id_token);
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            const data = {
                nombre,
                correo,
                img,
                Password: 'asd',
                google: true,
                rol: 'USER_ROLE'

            }
            console.log('Creando Usuario');
            const nuevo_usuario = new Usuario(data);
            await nuevo_usuario.save();
            console.log('Usuario Creado Base de Datos')
        } else {
            if (!usuario.estado) {
                return res.status(401).json({
                    msg: 'Hable con el administrador, usuario bloqueado'
                })
            }

            const token = await generarjwt(usuario.id);
            res.json({
                usuario,
                token

            })

        }

    } catch (error) {
        res.status(500).json({
            msg: 'Problema para validar token',
            error
        })
    }

}

module.exports = {
    login,
    googleSignIn
}