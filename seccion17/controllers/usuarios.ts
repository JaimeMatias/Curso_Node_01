import { Request, Response } from 'express';
export const GetUsuarios = (req: Request, res: Response) => {
    res.json({
        msg: 'getUsuarios',
    })
};

export const GetUsuario = (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({
        msg: 'getUsuario',
        id
    })
};

export const PostUsuario = (req: Request, res: Response) => {
    const { body } = req.params;
    res.json({
        msg: 'postUsuario',
        body
    })
};

export const PutUsuario = (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'getUsuario',
        id,
        body
    })
};

export const DeleteUsuario = (req: Request, res: Response) => {

    const { id } = req.params;
    
    res.json({
        msg: 'deleteUsuario',
        id,
        
    })
};


