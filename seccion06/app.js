const {inquierer_menu,pausa} = require('../seccion06/helper/inquirer');
const main=async() => {
    
    let opt=1;
    let esperar=true;
    do {
        opt= await inquierer_menu();
        switch (opt) {
            case 1:
                console.log('Selecionó la opción 1')
                esperar=true    
                break;
            case 2:
                console.log('Selecionó la opción 2')    
                esperar=true
                break;
            case 0:
                console.log('Selecionó salir')    
                esperar=false
        }
        console.log(opt);
    if(esperar)await pausa();

    } while (opt!==0);

};






















main()