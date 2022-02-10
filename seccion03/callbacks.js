const Saludar=()=>console.log('Hola')
const getUsuarioById=(id,callback)=>{
    const usuario={
        id,
        nombre:'Matias'
    }
    setTimeout(()=>{
        callback(usuario),1500
    }


    )
}

getUsuarioById(10,(usuario)=>{
    console.log(usuario);
});
setTimeout(Saludar,2000);