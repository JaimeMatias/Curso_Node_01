//const { validarJWT } = require("../../middlewares");

let usuario = null;
let socket = null;

const txtUid = document.querySelector('#txtUid')
const txtMensaje = document.querySelector('#txtMensaje')
const ulUsuarios = document.querySelector('#ulUsuarios')
const ulMensajes = document.querySelector('#ulMensajes')
const btnSalir = document.querySelector('#btnSalir')
var url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth/'
    : 'https://restserver-curso-fher.herokuapp.com/api/auth/';

const validarJWT = async () => {
    const token = localStorage.getItem('token') || '';
    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }
    const resp = await fetch(url, {
        headers: { 'x-token': token }
    });

    const { usuario: userDB, token: TokenDB } = await resp.json()
    console.log(userDB, TokenDB)
    localStorage.setItem('token', TokenDB);
    usuario = userDB;
    document.title = usuario.nombre;

    await conectarSocket();
}

const conectarSocket = async () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect',()=>{
        console.log('Sockets Online')
    });

    socket.on('disconnect',()=>{
        console.log('Sockets Offline')
    });

    socket.on('recibir-mensajes',()=>{

    });
    
    socket.on('usuarios-activos',(payload)=>{
        dibujarUsuarios(payload)
    });
    
    socket.on('mensaje-privado',()=>{
    });
};

const dibujarUsuarios =(usuario=[])=>{
    console.log(usuario)
    let usersHtml='';
    usuario.forEach(({nombre,uid})=>{
        usersHtml+=`
        <li>
        <p>
        <h5 class="text-success">${nombre}</h5>
        <span class="fs-6 text-muted">${uid}</span>
        </p>
        </li>
        `
    });
    ulUsuarios.innerHTML=usersHtml;

};
const main = async () => {
    await validarJWT();
}
main()
//const socket=io()
