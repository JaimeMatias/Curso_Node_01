const express = require('express');
const cors = require('cors');
require('dotenv').config();

const {db_connection}=require('../database/config')

class server {
    constructor() {
        this.app = express();
        this.usuario_path='/api/usuarios';
        this.auth_path='/api/auth';
        //Conectar a base de Datos
        this.conectarDB()

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
        this.port = process.env.PORT;

    }
    async conectarDB(){
        await db_connection();
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
        this.app.use(this.auth_path,require('../routes/auth'));
        this.app.use(this.usuario_path,require('../routes/user'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Ejemplo corrienendo en: http://localhost: ${this.port}`)
        })
    }
}

module.exports = server