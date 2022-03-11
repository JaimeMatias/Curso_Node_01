const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {socket_controller}=require('../sockets/controller')
class server {
    constructor() {
        this.app = express();
        //Las rutas en la pagina web

        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {

        }

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
        this.port = process.env.PORT;

        //Sockets
        this.sockets()

    }
    middlewares() {//Todos los middlewares usan la palabra reservada use
        // CORS
        this.app.use(cors());

        //Directorio Publico
        this.app.use(express.static('public'));


    }

    routes() {
        //A donde consultar cuando se accede a cada ruta en la pagina web
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Ejemplo corrienendo en: http://localhost: ${this.port}`)
        })
    }

    sockets() {
        this.io.on('connection',socket_controller)
    }
}

module.exports = server