const socket_controller=(socket) => {
       
        socket.on('enviar-mensaje', (payload,callback) => {
            const id=12345;
            callback(id);
            socket.broadcast.emit('enviar-mensaje',payload)
        })
}

module.exports={
    socket_controller
}