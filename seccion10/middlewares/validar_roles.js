const {request,response}=require('express');
const admin_rol =async (req=request,res=response,next)=>{
    
    const {rol}=req.body_autenticado;
    if(rol !="ADMIN_ROLE"){
        return res.status(500).json({
            rol,
            msg:'Usuario no habilitado para dar de baja'
        })
        
    }
    next()
}

module.exports={
    admin_rol
}