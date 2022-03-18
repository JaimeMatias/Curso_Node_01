const TicketControl = require('../models/ticket-control');
const ticketControl = new TicketControl();

// Generad  evento desde el servidor
const socket_controller = async (socket) => {
    socket.emit('ultimo-ticket', ticketControl.ultimo);

    // Recibir un evento de la pagina web
    socket.on('siguiente-ticket', async (payload, callback) => {
        const ticket_siguiente = await ticketControl.siguiente();
        //Envio un objeto de la clase ticket
        callback(ticket_siguiente);
    });

    // Recibir un evento de la pagina web
    socket.on('atender-ticket', async (payload, callback) => {
        const { escritorio } = payload
        if (!escritorio) {
            return callback({
                status: false,
                msg: 'El escritorio es obligatorio'
            })
        }
        const ticket_atendido = await ticketControl.atenderTicket(escritorio);
        if (!ticket_atendido) {
            return callback({
                status: false,
                msg: 'No hay mas ticket para atender'
            })
        }else{
        //Envio un objeto de la clase ticket
        return callback({
            status:true,
            ticket_atendido
        })    
        }
        

    });

}

module.exports = {
    socket_controller
}