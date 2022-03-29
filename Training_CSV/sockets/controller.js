const fs =require("fs");
const socketController = async (socket, io) => {
//Mensajes en el BackEnd
    socket.on('connect', () => {
        //console.log('El valor del id: ',usuario._id)
        console.log('Usuario Conectado')
    })

    socket.on('disconnect', () => {
        //console.log('El valor del id: ',usuario._id)
        console.log('Usuario Desconectado')
    })

    socket.on('enviar-datos', (datos) => {
        //console.log('El valor del id: ',usuario._id)
        //console.log('Los datos recibidos:',datos)
        console.log(datos[0]);
        const data= JSON.stringify(datos);
        //console.log(data)
        fs.writeFile('user.json', data, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });

        for (let index = 0; index < 20; index++) {
            const element = datos[index];
            console.log(index, element)
            
        }

        })
};


module.exports = { socketController }