require('colors');
require('dotenv').config()



const { inquierer_menu, pausa, leer_imput, listado_lugares } = require('../seccion06/helper/inquirer');
const { Busquedas } = require('../seccion06/models/busquedas');
const { leer_archivo, guardar_archivo } = require('../seccion06/helper/guardar_archivo');

const main = async () => {


    let opt = 1;
    let esperar = true;
    let busqueda = new Busquedas();
    busqueda.historial=leer_archivo();
    do {
        opt = await inquierer_menu();
        switch (opt) {
            case 1:
                console.log('Selecionó la opción 1');
                const ciudad_buscada = await leer_imput('Por favor ingrese una ciudad');
                if (ciudad_buscada === '0') continue;

                lugares = await busqueda.ciudad(ciudad_buscada);
                const id_elegido = await listado_lugares(lugares)

                const lugarSel = lugares.find(f => f.id === id_elegido);

                const { id, nombre, Lng, Lat } = lugarSel;
                busqueda.agregar_historial(nombre)
                //console.log(lugarSel);
                console.log(`\nInformación de la ciudad:\n`.green);
                console.log(`Ciudad: ${nombre.green}`);
                console.log(`Lat: ${Lat.toString().green}`);
                console.log(`Lng: ${Lng.toString().green}`);
                const temperatura = await busqueda.clima(Lat, Lng);
                const { Desc, Temp, Temp_min, Temp_max } = temperatura;
                console.log(`Clima:${Desc.green}`);
                console.log(`Temperatura:${Temp.toString().green}`);
                console.log(`Mínima:${Temp_min.toString().green}`);
                console.log(`Maxima:${Temp_max.toString().green}`);
                esperar = true;
                break;
            case 2:
                console.log('Selecionó la opción 2');
                busqueda.historial_capitalizado();
                esperar = true;
                break;
            case 0:
                console.log('Selecionó salir');
                esperar = false;

        }
        guardar_archivo(busqueda.historial);
        if (esperar) await pausa();

    } while (opt !== 0);

};


main()