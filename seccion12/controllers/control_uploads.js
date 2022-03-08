const {response}=require('express');
const cargar_archivo=async(req,res)=>{
res.json({
    msg:'Archivo Cargado'
})
}

module.exports={
    cargar_archivo,
}