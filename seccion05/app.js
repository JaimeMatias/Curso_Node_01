require('colors');

const {inquierer_menu,pausa}=require('../seccion05/helper/inquirer');
const Tarea=require('./models/tarea');
const Tareas=require('./models/tareas');
console.clear();
const main= async() =>{

    console.log('Hola Mundo');
    let opt='';
    do {
        opt= await inquierer_menu();    
        console.log({opt});
        console.log(opt['option']);

        if (opt['option']!== '0') await pausa();
    }while (opt['option']!== '0');
   const tarea= new Tarea('Comprar Comida');
   console.log(tarea);
   const tareas= new Tareas();
   tareas._listado[tarea.id]=tarea;
   console.log(tareas);
}

main()