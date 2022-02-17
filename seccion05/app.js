require('colors');

const { guardar_archivo, leer_archivo } = require('../seccion05/helper/guardar_archivo')
const { inquierer_menu, pausa, leer_imput, listado_tarea_borrar, confirmar,mostrar_listado_cheklist } = require('../seccion05/helper/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
console.clear();
const main = async () => {


    let opt = '';
    const tareas = new Tareas();
    const tareasdb = leer_archivo();


    tareas.cargar_tarea(tareasdb);

    do {
        opt = await inquierer_menu();
        await_true = true;
       
        switch (opt) {
            case '1':
                const desc = await leer_imput('Descripción');
                let men = 'Desea Crear el Elemento el elemento:';
                const confirma = await confirmar(men);
                if (confirma) {
                    const tarea = new Tarea(desc);
                    tareas._listado[tarea.id] = tarea;
                }
                await_true = false;
                break;

            case '2':
                tareas.listado_completo();
                break;
            case '3':
                tareas.listar_pendientes_completadas(true);
                break;
            case '4':
                tareas.listar_pendientes_completadas(false);
                break;
            case '5':
                const ids = await mostrar_listado_cheklist(tareas.listado_arr);
                tareas.toggle_completadas(ids);
                break;
            case '6':
                //console.log(tareas.listado_arr);
                const id = await listado_tarea_borrar(tareas.listado_arr);
                console.log({ id });
                if (id != '0') {
                    let men = 'Desea eliminar el elemento:';
                    const confirma = await confirmar(men);
                    if (confirma) {
                        tareas.borrar_tareas(id);
                        console.log('Tarea Borrada');
                    }

                }
                await_true = false;
                break;
            case '0':
                await_true = false;
                break;
        };

        guardar_archivo(tareas.listado_arr);

        if (await_true) await pausa();
    } while (opt !== '0');
}

main()