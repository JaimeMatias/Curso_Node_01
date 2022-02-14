const fs=require('fs');
const colors=require('colors');
const ImprimirTabla=async(base,ID)=>{
 console.log(`=============================`.green)


    let sal =''
    let consola=''

    for (let i = 0; i <=ID; i++) {
        consola=consola+`${base} ${'x'.green} ${i}  ${'='.green} ${colors.yellow(base*i)}\n`
        sal=sal +` ${base} x ${i} = ${base*i} \n`
    }
    try {
        fs.writeFileSync(`./salida/Tabla-${base}.txt`,sal)
        
        return [`Tabla-${base}.txt`,consola]
    } catch (error) { 
        throw error
    }
      
}

module.exports ={
ImprimirTabla
}