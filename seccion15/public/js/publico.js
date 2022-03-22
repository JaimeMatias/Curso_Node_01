const  Ticket1= document.querySelector('#lblTicket1');
const  Ticket2= document.querySelector('#lblTicket2');
const  Ticket3=document.querySelector('#lblTicket3');
const  Ticket4=document.querySelector('#lblTicket4');
const  Escritorio1=document.querySelector('#lblEscritorio1');
const  Escritorio2=document.querySelector('#lblEscritorio2');
const  Escritorio3=document.querySelector('#lblEscritorio3');
const  Escritorio4=document.querySelector('#lblEscritorio4');

const socket = io();
socket.on('connect', () => {
    // console.log('Conectado');
    console.log('Contectado al servidor');
    // btnCrear.disabled=false;

});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    // btnCrear.disabled=true;
});


socket.on('estado-actual', (payload) => {
    const [ticket1, ticket2, ticket3, ticket4] = payload;
    console.log([ticket1, ticket2, ticket3, ticket4])
    if(ticket1){
        const {numero,escritorio}=ticket1
        Ticket1.innerText=`Ticket N° ${numero}`
        Escritorio1.innerText=`Ticket N° ${escritorio}`
    }
    if(ticket2){
        const {numero,escritorio}=ticket2
        Ticket2.innerText=`Ticket N° ${numero}`
        Escritorio2.innerText=`Ticket N° ${escritorio}`
    }
    if(ticket3){
        const {numero,escritorio}=ticket3
        Ticket3.innerText=`Ticket N° ${numero}`
        Escritorio3.innerText=`Ticket N° ${escritorio}`
    }
    if(ticket4){
        const {numero,escritorio}=ticket4
        Ticket4.innerText=`Ticket N° ${numero}`
        Escritorio4.innerText=`Ticket N° ${escritorio}`
    }

});
console.log('Público HTML')