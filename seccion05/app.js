require('colors');

const { inquierer_menu, pausa, leer_imput } = require('../seccion05/helper/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
console.clear();
const main = async () => {


    let opt = '';
    const tareas = new Tareas();
    do {
        opt = await inquierer_menu();

        switch (opt) {
            case '1':
                const desc = await leer_imput('Descripción');
                const tarea = new Tarea(desc);
                tareas._listado[tarea.id] = tarea;
                break;

            case '2':
                console.log(tareas.listado_arr);
                break;
        }
        if (opt !== '0') await pausa();
    } while (opt !== '0');
}

main()