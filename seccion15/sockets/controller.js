const TicketControl = require('../models/ticket-control');
const ticketControl = new TicketControl();

// Generad  evento desde el servidor
const socket_controller = async (socket) => {
    // Los sockets emits, se generan cuando se conecta un socket,
    //Si el socket está escuchando el evento lo va a detectar cuando se conecta
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    //socket.emit('prueba-socket','Este es el mejor mensaje del mundo')

    socket.emit('estado-actual', ticketControl.ultimos4data); //Envió a los sockets a información de los ultimos 4 tickets

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
        try {
            const { dbticket, cantTickets } = await ticketControl.atenderTicket(escritorio);
            //la palabra Broadcast sirve para enviar a todos los endpoints
            socket.broadcast.emit('estado-actual', ticketControl.ultimos4data); //Envió a los sockets a información de los ultimos 4 tickets

            console.log('DAAATOOOS:', dbticket, cantTickets)
            if (!dbticket) {
                return callback({
                    status: false,
                    msg: 'No hay mas ticket para atender'
                })
            } else {

                //Cuando se hace bradcast, no se puede usar callback
                socket.broadcast.emit('actualizar-estado-listas', { dbticket, cantTickets })
                //Envio un objeto de la clase ticket
                return callback({
                    status: true,
                    dbticket,
                    cantTickets
                })
            }
        } catch (error) {
            return callback({
                status: false,
            })
        }




    });

}

module.exports = {
    socket_controller
}