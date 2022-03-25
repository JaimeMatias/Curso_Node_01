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

socket.on('disconnect',()=>{
    //console.log('El valor del id: ',usuario._id)
    chatMensajes.descoectarUsuario(usuario._id)
    io.emit('usuarios-activos',chatMensajes.usuariosArr)
})
};

module.exports={socketController}