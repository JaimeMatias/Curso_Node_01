// const prueba=()=>{
//     console.log('Hola Mundo')
// };
// module.exports={
//     prueba
// }
const lblOnline = document.querySelector('#lblOnline');
const lblOffine = document.querySelector('#lblOffine');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

//socket.on es para escuchar eventos del socket
socket.on('connect', () => {
    console.log('Conectado: ', socket.id)
    lblOnline.style.display = '';
    lblOffine.style.display = 'none';
});
socket.on('disconnect', () => {
    console.log('Desconectado: ', socket.id)
    lblOnline.style.display = 'none';
    lblOffine.style.display = '';
})

socket.on('enviar-mensaje',(payload)=>{
    console.log(payload)
})

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;


    //Socket.emit es para enviar datos desde el socket
    //enviar-mensaje es el nombre del evento que debe escuchar el servidor
   
    socket.emit('enviar-mensaje',mensaje,(id)=>{
        console.log('Desde el server',id);
    });
    
})