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
    //Primer Nivel
    const NombreEmp= empleados.find(
        //Segundo Nivel
        (e)=>{
            //Tercer Nivel
            return e.id ===id
        }
    )?.nombre
    const promesa=new Promise((resolve,reject)=>{
        if(NombreEmp){
            resolve(NombreEmp,'hola');
        }else{
            reject(`No se encontró el salario del empleado con el id = ${id}`,'hola')
        }
    });
    return promesa

}

const getSalario=(id)=>{
    //Primer Nivel
    const SalarioEmp= salarios.find((elementoSalario)=>{return elementoSalario.id ===id})?.salario
    return new Promise((resolve,reject)=>{
        (SalarioEmp)
            ? resolve(SalarioEmp)
            : reject(`No se encontró el salario del empleado con el id = ${id}`)
        
    });
    }


id=3


getEmpleado(id)
    .then(ResultadoFun=>console.log(ResultadoFun))
    .catch(ERROR=>{console.log(ERROR)})

getSalario(id)
    .then(ResultadoFun=>console.log(ResultadoFun))
    .catch(ERROR=>console.log(ERROR))

if (id==2){
    console.log('El valor es verdadero')
    console.log('El id es: ' +id)
}else{console.log('El valor es falso')
    console.log('El id es: ' +id)}

(id==3)
?console.log('El valor es verdadero')
: (console.log('El valor es falso'))



const Imprimir =(dato)=>console.log(`${dato}`)

getEmpleado(id)
    .then((Empleado)=>{
        getSalario(id)
            .then(Salario=>{
                console.log(`El id: ${id} corresponde a ${Empleado} quien tiene un sueldo de ${Salario}`)
            })
            .catch((ERROR)=>{
                Imprimir(ERROR)            
            })

    })
    .catch((ERROR)=>{
        Imprimir(ERROR)

    })



getEmpleado(id)
    .then(empleado =>
        getSalario(id)
        )
        .then(salario =>console.log(`${salario}`))
        .catch(ERROR=>console.log(ERROR))
     