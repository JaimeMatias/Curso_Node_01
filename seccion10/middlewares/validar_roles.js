const {request,response}=require('express');

const tiene_role=(...roles)=>{

return (req,res,next)=>{ //Estoy devolviendo una función del tipo middelwares
    const rol=req.body_autenticado.rol;
    if(!roles.includes(rol)){
        return res.status(500).json({
            rol,
            msg:'Usuario no habilitado para dar de baja'
        })
        
    }
    next()
}
}
module.exports={
    
    tiene_role
}