const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { socketController } = require('../sockets/controller')
//const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //Configuración de los sockets
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server)


        // Conectar a base de datos
        //this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //Socket
        this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {
        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {


    }
    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io))
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;
