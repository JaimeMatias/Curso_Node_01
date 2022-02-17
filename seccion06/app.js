const {inquierer_menu,pausa,leer_imput} = require('../seccion06/helper/inquirer');
const {Busquedas}=require('../seccion06/models/busquedas');
require('colors');
const main=async() => {
    
    let opt=1;
    let esperar=true;
    let busqueda=new Busquedas();
    do {
        opt= await inquierer_menu();
        switch (opt) {
            case 1:
                console.log('Selecionó la opción 1');
                const ciudad_buscada= await leer_imput('Por favor ingrese una ciudad');
                busqueda.ciudad(ciudad_buscada);
                console.log(`Información de la ciudad:`.green);
                console.log(`Ciudad: `);
                console.log(`Lat:`);
                console.log(`Lng: `);
                console.log(`Temperatura:`);
                console.log(`Mínima:`);
                console.log(`Maxima:`);
                esperar=true;    
                break;
            case 2:
                console.log('Selecionó la opción 2')    ;
                esperar=true;
                break;
            case 0:
                console.log('Selecionó salir')    ;
                esperar=false;
        }
    if(esperar)await pausa();

    } while (opt!==0);

};






















main()