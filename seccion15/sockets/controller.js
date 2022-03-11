const socket_controller=(socket) => {
        console.log('Cliente Conectado', socket.id)
        socket.on('disconnect', () => {
            console.log('Cliente Desconectado', socket.id)
        })


        socket.on('enviar-mensaje', (payload,callback) => {
            const id=12345;
            callback(id);
            socket.broadcast.emit('enviar-mensaje',payload)
        })
}

module.exports={
    socket_controller
}