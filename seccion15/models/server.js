const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { db_connection } = require('../databaseConnection/config')

const { socket_controller } = require('../sockets/controller')
class server {
    constructor() {
        this.app = express();
        //Las rutas en la pagina web

        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {

        }

        //Conectar a base de Datos
        this.conectarDB()

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
        this.port = process.env.PORT;

        //Sockets
        this.sockets()

    }
    
  /*
  FUNCIONES DE LA CLASE
  */  
    async conectarDB() {
        //Función que sirve para conectarnos a la base de datos Sockets
        await db_connection();
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
        this.io.on('connection', socket_controller)
    }
}

module.exports = server