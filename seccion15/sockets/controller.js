const TicketControl = require('../models/ticket-control');
const ticketControl = new TicketControl();


const socket_controller = async(socket) => {

    socket.on('siguiente-ticket', async(payload, callback) => {
        const siguiente =await ticketControl.siguiente()


       
            console.log(`El valor de siguiente: ${siguiente}`)
       
            callback(siguiente);
       
       


    })
}

module.exports = {
    socket_controller
}