const {comprobarJWT}=require('../helpers')
const {ChatMensajes}=require('../models')
const chatMensajes=new ChatMensajes();

const socketController =async(socket,io)=>{
const token=socket.handshake.headers['x-token'];
const usuario=await comprobarJWT(token);
if(!usuario){
    return socket.disconnect();
}
console.log('Se conecto',usuario.nombre);

chatMensajes.conectarUsuario(usuario);
io.emit('usuarios-activos',chatMensajes.usuariosArr)
socket.emit('recibir-mensajes',chatMensajes.ultimos10)

//Conectar a una sala especial
socket.join(usuario.id);

socket.on('disconnect',()=>{
    //console.log('El valor del id: ',usuario._id)
    chatMensajes.descoectarUsuario(usuario._id)
    io.emit('usuarios-activos',chatMensajes.usuariosArr)
})
socket.on('enviar-mensaje',({mensaje,uid})=>{
    if (uid)
    { // Mensaje Privado
        console.log('Mensaje Privado')
        socket.to(uid).emit('mensaje-privado',{de:usuario.nombre,mensaje})
    }else {
        chatMensajes.enviarMensaje(usuario.id,usuario.nombre,mensaje);
        io.emit('recibir-mensajes',chatMensajes.ultimos10)
    }
 
    
})
};


module.exports={socketController}