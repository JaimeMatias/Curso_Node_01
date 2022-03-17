
//Identifico los elementos de la pagina web
const lblNuevoTicket =document.querySelector('#lblNuevoTicket');
const btnCrear= document.querySelector('button');


const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    console.log('Contectado al servidor');
    btnCrear.disabled=false;

});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    btnCrear.disabled=true;
    
});
// Recibir un evento de la pagina web
socket.on('ultimo-ticket',(ultimo) => {
    lblNuevoTicket.innerText=`Ticket N° ${ultimo}`
    console.log('respuesta: ',ultimo);
    //btnCrear.disabled=true;
    
});


// Generad  evento desde la pagina web
btnCrear.addEventListener( 'click', () => {
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        console.log('Desde el server', ticket );
        
        const{numero}=ticket;
        console.log('Valor: ',numero)
        lblNuevoTicket.innerText=`Ticket N° ${numero}`
    });

});