require('colors');

const {inquierer_menu,pausa}=require('../seccion05/helper/inquirer');
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
   
}

main()