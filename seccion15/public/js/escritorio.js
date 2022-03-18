const socket = io();


const searchParams = new URLSearchParams(window.location.search);//trae el contenido de la pagina web
const lblEscritorio=document.querySelector('#lblEscritorio');
const btnAtender=document.querySelector('button');

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');

}

const escritorio= searchParams.get('escritorio');

//Asigna el valor a una etiqueta
lblEscritorio.innerText=`${escritorio}`


socket.on('connect', () => {
    // console.log('Conectado');
    console.log('Contectado al servidor');
    btnAtender.disabled=false;

});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    btnAtender.disabled=true;
    
});
// Recibir un evento de la pagina web
 socket.on('ultimo-ticket',(ultimo) => {})
//     lblNuevoTicket.innerText=`Ticket N° ${ultimo}`
//     console.log('respuesta: ',ultimo);
//     //btnCrear.disabled=true;
    
// });


 // Generad  evento desde la pagina web
 //btnCrear.addEventListener( 'click', () => {
 //socket.emit( 'siguiente-ticket', null, ( ticket ) => {
//         console.log('Desde el server', ticket );
        
//         const{numero}=ticket;
//         console.log('Valor: ',numero)
//         lblNuevoTicket.innerText=`Ticket N° ${numero}`
//     });

// });