const express = require('express');
const cors = require('cors');
require('dotenv').config();

class server {
    constructor() {
        this.app = express();
        this.usuario_path='/api/usuarios';

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
        this.port = process.env.PORT;

    }

    middlewares() {
        // CORS
        this.app.use(cors());

        //Lectura y Parseo del Body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuario_path,require('../routes/user'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Ejemplo corrienendo en: http://localhost: ${this.port}`)
        })
    }
}

module.exports = server