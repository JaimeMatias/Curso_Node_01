const TicketControl =require('../models/ticket-control');
const socket_controller=(socket) => {
       
        socket.on('enviar-mensaje', (payload,callback) => {
            const id=12345;
            callback(id);
            socket.broadcast.emit('enviar-mensaje',payload)
        })
}
const inicializar_ticket =async()=>{
    
        const ticketControl = new TicketControl(); 
        setTimeout( ()=>{
            ticketControl.siguiente();
        },3000
        );
       
    
     
     
}
inicializar_ticket()

module.exports={
    socket_controller
}