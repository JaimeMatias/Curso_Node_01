const inquirer = require("inquirer");
require('colors');

const menu_options = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.green} Crear Tarea`,

            },
            {
                value: '2',
                name: `${'2'.green} Listar Tareas`,

            },
            {
                value: '3',
                name: `${'3'.green} Listar Tareas Completadas`,

            }
            ,
            {
                value: '4',
                name: `${'4'.green} Listar Tareas Pendientes`,


            },
            {
                value: '5',
                name: `${'5'.green} Completar Tarea(s)`,


            },
            {
                value: '6',
                name: `${'6'.green} Borrar Tarea`,

            },
            {
                value: '0',
                name: `${'0'.red} ${'Salir'.red}`,
            }

        ]
    }
];



const inquierer_menu = async () => {
    console.clear()
    console.log('========================='.green);
    console.log('  Seleccione una opción'.green);
    console.log('=========================\n'.green);

    const opt = await inquirer.prompt(menu_options);
    return opt.option
};


const pausa = async () => {
    const menu_pausa = [{
        type: 'input',
        name: 'pausa',
        message: `\nPresione ${'ENTER'.green} para continuar: \n`,
    }
    ];
    const opt = await inquirer.prompt(menu_pausa);
    return opt
}

const leer_imput = async (message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }];

    const respuesta = await inquirer.prompt(question);
    return respuesta.desc;

}

const listado_tarea_borrar= async (tareas=[])=>{
    const choices=tareas.map((tarea,i)=>{
        return{
            value:tarea.id,
            name:`id: ${i+1}: desc: ${ tarea.desc}`,
        }
    });
    console.log(choices);
    choices.unshift(
        {
            value:'0',
            name:'0'.green + ' CANCELAR'
        }
    )
    const question=[{
        type:'list',
        name:'id',
        message:'Borrar',
        choices: choices,
    }];
    const {id} = await inquirer.prompt(question);
    console.log(id);
   
    return id;
};
const confirmar =async(message)=>{
    const question=[{
        type: 'confirm',
        name: 'confirmacion',
        message,
        
      }]
      const {confirmacion}=await inquirer.prompt(question);
      return confirmacion
      
}


module.exports = {
    inquierer_menu,
    pausa,
    leer_imput,
    listado_tarea_borrar,
    confirmar,
}