const socket = io();


const searchParams = new URLSearchParams(window.location.search);//trae el contenido de la pagina web
const lblEscritorio=document.querySelector('#lblEscritorio');
const btnAtender=document.querySelector('button');
const lblTicketNumero=document.querySelector('#lblTicketNumero');
const divAlerta=document.querySelector('.alert');

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');

}

const escritorio= searchParams.get('escritorio');
divAlerta.style.display='none';

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
 btnAtender.addEventListener( 'click', () => {

    //Emitir un mensaje al backend
    socket.emit('atender-ticket',{escritorio},({status,ticket_atendido})=>{ //Escritorio es el valor que se envia al bacj y Ticket es el callback de la función atender-tickets

 if(!status){
    lblTicketNumero.innerText=`NADIE`;
     return divAlerta.style.display='';
 }
console.log(ticket_atendido);

const {numero}=ticket_atendido;
        lblTicketNumero.innerText=`${numero}`;
    })

 });
 //socket.emit( 'siguiente-ticket', null, ( ticket ) => {
//         console.log('Desde el server', ticket );
        
//         const{numero}=ticket;
//         console.log('Valor: ',numero)
//         lblNuevoTicket.innerText=`Ticket N° ${numero}`
//     });

// });