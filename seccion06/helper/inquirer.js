const inquirer = require("inquirer");
require('colors');

const menu_options = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1'.green} Buscar Ciudad`,

            },
            {
                value: 2,
                name: `${'2'.green} Historial`,

            },

            {
                value: 0,
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

const listado_lugares = async (lugares = []) => {
    const choices = lugares.map((lugar, i) => {
        return {
            value: lugar.id,  // The value to store of the answer              
            name: `id: ${(i + 1).toString().green}. ${lugar.nombre.green}`,
        }
    });

    choices.unshift(
        {
            value: '0',
            name: '0'.green + ' CANCELAR'
        }
    )
    const question = [{
        type: 'list',
        name: 'id', //The name to use when storing the answer in the answers 
        message: 'Seleccione',
        choices,
    }];
    console.log(question);
    const {id} = await inquirer.prompt(question);
    return id;
};


const confirmar = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'confirmacion',
        message,

    }]
    const { confirmacion } = await inquirer.prompt(question);
    return confirmacion

}

const mostrar_listado_cheklist = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        return {
            value: tarea.id,
            name: `id: ${i + 1}:${tarea.desc}`,
            checked: (tarea.completado_en) ? true : false
        }
    });
    

    const question = [{
        type: 'checkbox',
        name: 'id',
        message: 'Completar',
        choices
    }];
    const { id } = await inquirer.prompt(question);
    

    return id;
};



module.exports = {
    inquierer_menu,
    pausa,
    leer_imput,
    listado_lugares,
    confirmar,
    mostrar_listado_cheklist,
}