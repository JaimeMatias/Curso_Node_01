//const { validarJWT } = require("../../middlewares");

let usuario = null;
let socket = null;

const uploadconfirm = document.querySelector('#uploadconfirm')
const conectarSocket = async () => {
    //Mensajes en el FrontEnd
    socket = io();

    socket.on('connect', () => {
        console.log('Sockets Online')
    });

    socket.on('disconnect', () => {
        console.log('Sockets Offline')
    });


};


uploadconfirm.addEventListener('click', () => {
    console.log('Se detecto el click')
    Papa.parse(document.getElementById('uploadfile').files[0], {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            console.log(results.data)
            const datos=results.data
            socket.emit('enviar-datos',  datos )
        }
    })


})

const main = async () => {
    await conectarSocket();
}
main()
//const socket=io()
