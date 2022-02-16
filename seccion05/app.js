require('colors');

const {guardar_archivo,leer_archivo}=require('../seccion05/helper/guardar_archivo')
const { inquierer_menu, pausa, leer_imput } = require('../seccion05/helper/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
console.clear();
const main = async () => {

   
    let opt = '';
    const tareas = new Tareas();
    const tareasdb=leer_archivo();
   
  
    tareas.cargar_tarea(tareasdb);
   
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

        guardar_archivo(tareas.listado_arr);
        
        if (opt !== '0') await pausa();
    } while (opt !== '0');
}

main()