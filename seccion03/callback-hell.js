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

const getEmpleadoTradicional =(id) =>{
    for (let i = 0; i < empleados.length; i++) {
       if (id== empleados[i].id){
           return console.log(empleados[i])}
        
    }
}

getEmpleadoTradicional(1)

const getEmpleado=(id,callback)=>{
    //Primer Nivel
    const empleado= empleados.find(
        //Segundo Nivel
        (e)=>{
            //Tercer Nivel
            return e.id ===id
        }
    )
    if (empleado){
        callback(null,empleado.nombre);
    }else{
        callback (true,`No existe el empleado con el id = ${id}`);
    }

}



const getSalario=(id,callback)=>{

    const salario= salarios.find(
        
        (s)=>{return s.id===id
        }
        )
    if (salario){
        callback(null,salario.salario)
    }else{
        callback(true,`No se encontró el salario del empleado con el id = ${id}`)
    }
}

const getSalario2=(id,callback)=>{

    const salario= salarios.find(
        
        (s)=>{return s.id===id
        }
        )?.salario;
    if (salario){
        callback(null,salario)
    }else{
        callback(true,`No se encontró el salario del empleado con el id = ${id}`)
    }
}


let id=2

getEmpleado(id,(err,empleado) =>{
    if(err){
        console.log('ERRO!')
        console.log(empleado);
        
    }else{console.log('Empleado Existe!');
    console.log(empleado)}
    
}
    )

getSalario(id,(err,salario) =>{
    if (err){
        console.log('ERRO!')
        console.log(salario)
    }else{console.log('Salario Existe!');
    console.log(salario)}
    
}   
    )

    getSalario2(id,(err,salario) =>{
        if (err){
            return console.log(err);
        }
        console.log(salario)        
    }   
        )


getEmpleado(id,(
    (err,empleado) =>{
        if (err){
            console.log('ERROR!');
            return console.log(empleado);
        }else{
            getSalario2(id,((err,salario)=>{
                if(err){
                    console.log('ERROR!');
                    return console.log(salario);
                }{
                    console.log (`El empleado ${empleado} tiene un salario de ${salario}`)
                }
            }
                
            ))
        }
    }

        )
    
    )

console.log(salarios[3]?.salario)


