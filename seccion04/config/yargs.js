const argv=require('yargs')
.option('l',{
    alias:'listar',
    type:'boolean',
    demandOption:false,
    default:false,
    description:'Muestra la tabla en consola'
})
.option('b',{
    alias:'base',
    type:'number',
    demandOption:true,
    description:'La base de la tabla de multiplicar'
})
.option('h',{
    alias:'hasta',
    type:'numbre',
    demandOption:false,
    default:10,
    description:'La catndiada de veces que va a iterar la función   '
}
) 
.check((argv,option)=>{
    if(isNaN(argv.b)){
        throw 'La base tiene que ser un número'
    } return true
    
}


)
.argv;

module.exports =argv;