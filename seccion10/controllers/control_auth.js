const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario =require('../models/usuario');


const login =async(req=request,res=response)=>{
    const {correo,Password}=req.body;
    try {


        const usuario= await Usuario.findOne({correo});
       
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos -correo'
            })
        }else{
            
            if(!usuario.estado){
                return res.status(400).json({
                    msg:'Usuario dado de baja de la base de datos'
                })
            };

            const valid_password= bcryptjs.compareSync(Password,usuario.Password);
            if(!valid_password){
                return res.status(400).json({
                    msg:'Contraseña Incorrecta'
                })
            }
        }
        

        res.json({
            msg:'login ok',
            correo,
            Password,

           
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        })
        
    }

}

module.exports ={
    login
}