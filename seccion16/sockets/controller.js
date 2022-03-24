const {comprobarJWT}=require('../helpers')
const socketController =async(socket)=>{
console.log('cliente Conectado',socket.id);
console.log(socket.handshake.headers['x-token']);
const token=socket.handshake.headers['x-token'];
const usuario=await comprobarJWT(token);
if(!usuario){
    return socket.disconnect();
}
console.log('Se conecto',usuario.nombre);
};

module.exports={socketController}