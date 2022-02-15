const inquirer = require("inquirer");
require('colors');

const menu_options=[
    {
        type:'list',
        name:'option',
        message:'¿Que desea hacer?',
        choices:[
            {value:'1',
            name:'1.Crear Tarea'

            },
            {value:'2',
            name:'2.Listar Tareas'

            },
            {value:'3',
            name:'3.Listar Tareas Completadas'

            }
            ,
            {value:'4',
            name:'4.Listar Tareas Pendientes'

            
            },
            {value:'5',
            name:'5.Completar Tarea(s)'

            
            },
            {value:'6',
            name:'6.Borrar Tarea'

            },
            {value:'0',
            name:'0.Salir'
            }
            
    ]
    }
];

const menu_pausa=[{
    type:'input',
    name:'pausa',
    message:`\nPresione ${'ENTER'.green} para continuar: \n`,
}        

    
];

const inquierer_menu =async() =>{
    console.clear()
    console.log('========================='.green);
    console.log('  Seleccione una opción'.green);
    console.log('=========================\n'.green);

    const opt =await inquirer.prompt(menu_options);
    return opt
};


const pausa =async() =>{
    const opt=await inquirer.prompt(menu_pausa);
    return opt
}



module.exports={
    inquierer_menu,
    pausa,
}