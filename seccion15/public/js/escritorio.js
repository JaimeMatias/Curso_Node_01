const socket = io();


const searchParams = new URLSearchParams(window.location.search);//trae el contenido de la pagina web
const lblEscritorio = document.querySelector('#lblEscritorio');
const btnAtender = document.querySelector('button');
const lblTicketNumero = document.querySelector('#lblTicketNumero');
const lblTicketPendientes = document.querySelector('#lblPendientes');
const divAlerta = document.querySelector('.alert');

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');

}

const escritorio = searchParams.get('escritorio');
divAlerta.style.display = 'none';

//Asigna el valor a una etiqueta
lblEscritorio.innerText = `${escritorio}`


socket.on('connect', () => {
    // console.log('Conectado');
    console.log('Contectado al servidor');
    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    btnAtender.disabled = true;

});


socket.on('actualizar-estado-listas', ({ dbticket, cantTickets }) => {
    console.log('El evento de Prueba Socket', dbticket, cantTickets);
    const { numero } = dbticket;
    if(cantTickets==0){
        lblTicketNumero.innerText = `NADIE`;
        lblTicketPendientes.innerText = `${cantTickets}`;
        return divAlerta.style.display = '';
       
    }else{
        lblTicketNumero.innerText =`${numero}`;
        lblTicketPendientes.innerText = `${cantTickets}`;
    }
    
    
    
})
// Generad  evento desde la pagina web
btnAtender.addEventListener('click', () => {

    //Emitir un mensaje al backend
    socket.emit('atender-ticket', { escritorio }, ({ status, dbticket, cantTickets }) => { //Escritorio es el valor que se envia al back y
        //Los 3 valores que recibo son lo que me devuelve el back, 
        // Para que funcione tiene que tener el mimos nombre, porque estoy mandando un objeto en el back y tienen que coincidir los nombre
        console.log('El valor del status:',status)
        if (!status) {
            lblTicketNumero.innerText = `NADIE`;
            return divAlerta.style.display = '';
        }

        const { numero } = dbticket;
        if(cantTickets==0){
            lblTicketNumero.innerText = `NADIE`;
            lblTicketPendientes.innerText = `${cantTickets}`;
            return divAlerta.style.display = '';
           
        }else{
            lblTicketNumero.innerText =`${numero}`;
            lblTicketPendientes.innerText = `${cantTickets}`;
        }
        
        
    })

});