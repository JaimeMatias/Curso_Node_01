require('colors');
require('dotenv').config()



const { inquierer_menu, pausa, leer_imput, listado_lugares } = require('../seccion06/helper/inquirer');
const { Busquedas } = require('../seccion06/models/busquedas');


const main = async () => {


    let opt = 1;
    let esperar = true;
    let busqueda = new Busquedas();
    do {
        opt = await inquierer_menu();
        switch (opt) {
            case 1:
                console.log('Selecionó la opción 1');
                const ciudad_buscada = await leer_imput('Por favor ingrese una ciudad');
                lugares = await busqueda.ciudad(ciudad_buscada);
                const id_elegido = await listado_lugares(lugares)

                const lugarSel = lugares.find(f => f.id === id_elegido);
                const {id,nombre,Lng,Lat}=lugarSel;
                console.log(lugarSel);
                console.log(`\nInformación de la ciudad:\n`.green);
                console.log(`Ciudad: ${nombre}`);
                console.log(`Lat: ${Lat}`);
                console.log(`Lng: ${Lng}`);
                console.log(`Temperatura:${''}`);
                console.log(`Mínima:${''}`);
                console.log(`Maxima:${''}`);
                esperar = true;
                break;
            case 2:
                console.log('Selecionó la opción 2');
                esperar = true;
                break;
            case 0:
                console.log('Selecionó salir');
                esperar = false;
        }
        if (esperar) await pausa();

    } while (opt !== 0);

};


main()