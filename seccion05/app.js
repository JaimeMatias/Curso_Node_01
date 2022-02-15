require('colors');

const {mostrar_menu,pausa} =require('../seccion05/helper/mensajes')

console.clear();
const main= async() =>{

    console.log('Hola Mundo');
    mostrar_menu();
    pausa();
}

main();