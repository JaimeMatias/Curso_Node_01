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
}

module.exports = {
    socket_controller
}