class Mensaje {
    constructor(uid, nombre, mensaje) {
        this.uid = uid;
        this.nombre = nombre;
        this.mensaje = mensaje;
    }
}


class ChatMensajes {
    constructor() {
        this.ChatMensajes = [];
        this.usuarios = {};
    };
    get ultimos10() {
        this.ChatMensajes = this.ChatMensajes.splice(0, 10);
        return this.ChatMensajes;
    };
    get usuariosArr() {
        return Object.values(this.usuarios);//Devuelve la colección como un arreglo
    };

    enviarMensaje(uid, nombre, mensaje) {
        console.log("Datos en enviarMensaje:",uid, nombre, mensaje)
        this.ChatMensajes.unshift(
            new Mensaje(uid, nombre, mensaje)
        )
        console.log('this mensajes:', this.ChatMensajes)
    };

    conectarUsuario(usuario){
        this.usuarios[usuario.id]=usuario
        
    };
    descoectarUsuario(id){
        delete this.usuarios[id];
        
    }
}

module.exports=ChatMensajes;