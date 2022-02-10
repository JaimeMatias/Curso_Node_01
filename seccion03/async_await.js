const empleados=[
    {
        id:1,
        nombre:'Matias'
    },
    {
        id:2,
        nombre:'Raul'
    },
    {
        id:3,
        nombre:'Jaime'
    }
]

const salarios=[
    {
        id:1,
        salario:1000
    },
    {
        id:2,
        salario:1500
    }
    
]


const getEmpleado=(id)=>{
    const NombreEmp= empleados.find((EMPLEADO)=>{return EMPLEADO.id ===id})?.nombre
    const promesa=new Promise((resolve,reject)=>{
        (NombreEmp)
        ? resolve(NombreEmp,'hola')
        : reject(`No se encontró el salario del empleado con el id = ${id}`,'hola')
        
    });
    return promesa

}

const getSalario=()=>{
        return new Promise((resolve,reject)=>{
        const SalarioEmp =salarios.find(s=>s.id=== id)?.salario;

        (SalarioEmp)
            ? resolve(SalarioEmp)
            : reject(`No se encontró el salario del empleado con el id = ${id}`)
        
    });
}


const getInfoUsuario=async(id)=>{
    try {
        const empleado= await getEmpleado(id)
        const salario=await getSalario(id)
        return `El salario del empleado: ${empleado} es ${salario}`    
    } catch (error) {
        return error
    }
    
}


const getInfoUsuario2=async(id)=>{
    try {
        const empleado= await getEmpleado(id)
        const salario=await getSalario(id)
        return `El salario del empleado: ${empleado} es ${salario}`    
    } catch (error) {
        throw error

    }
    
}
    id=4
getEmpleado(id)
    .then(ResultadoFun=>console.log(ResultadoFun))
    .catch(ERROR=>console.log(ERROR))

getSalario()
    .then(ResultadoFun=>console.log(ResultadoFun))
    .catch(ERROR=>console.log(ERROR))

getInfoUsuario(id).then(msg=>console.log(msg));
getInfoUsuario2(id)
    .then(msg=>console.log(msg))
    .catch(msg=>console.log(msg))

