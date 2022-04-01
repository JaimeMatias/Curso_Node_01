import { Request, Response } from 'express';
import Usuario from '../models/usuario';
export const GetUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll();
    res.json({
        msg: 'getUsuarios',
        usuarios
    })
};

export const GetUsuario = async (req: Request, res: Response) => {


    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        return res.json({
            msg: 'getUsuario',
            usuario
        })
    } else {
        return res.json({
            msg: 'Usuario No encontrado',

        })
    }

};

export const PostUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const existeEmail =await Usuario.findOne({
            where:{
                email:body.email
            }
        })
        if (existeEmail){
            return res.status(400).json({
                msg:'Ya existe un usuario con el email'+body.email
            })
        }
        const usuario = new Usuario(body);
        await usuario.save();
        res.json({
            msg: 'PostUsuario',
            body
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }

};

export const PutUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(400).json({
                msg:'No existe un usuario con el id'+id
            })
        }


        await usuario.update(body);
        res.json({
            msg: 'PostUsuario',
            usuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }

};

export const DeleteUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(400).json({
                msg:'No existe un usuario con el id'+id
            })
        }


        await usuario.update({estado:0});
        res.json({
            msg: 'PuttUsuario',
            usuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }
};


