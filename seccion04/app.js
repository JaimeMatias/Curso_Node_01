const {ImprimirTabla}=require('./helpers/multiplicar')
const argv=require('./config/yargs')


const ContestarSaludo2 =async(nombre)=>{
try {
    if (nombre=='matias'){
        return' Hola Matias'
    }
} catch (error) {
    return Error
}

}
const ContestarSaludo=(nombre)=>{
    const Promesa=new Promise((resolve,reject)=>{
        if(nombre=='matias'){
            resolve('Hola matias')
        }else{
            reject(`Otro Nombre`)
        }
})
return Promesa
}

//console.log(process.argv);
//const [,,arg3='base=5']=process.argv;
//const[,base=5]=arg3.split('=');


console.clear()
base=argv.base
cantidad=argv.hasta
listar=argv.listar
salida=ImprimirTabla(base,cantidad).then((salida)=>{console.log(salida[0], 'Creado')
if(listar)
{   console.log('La tabla es:')
    console.log(salida[1])}
})
.catch(ERROR=>console.log(ERROR))

//console.log(process.argv);
//console.log(argv);
//console.log(`Yarg Base: ${argv.base}`)