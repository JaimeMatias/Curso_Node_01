const express = require('express');
const cors = require('cors');
require('dotenv').config();

const {db_connection}=require('../database/config')

class server {
    constructor() {
        this.app = express();
        //Las rutas en la pagina web
        this.paths={
            auth:'/api/auth',
            categoria:'/api/categoria',
            usuarios:'/api/usuarios',
        }

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
        //A donde consultar cuando se accede a cada ruta en la pagina web
        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.usuarios,require('../routes/user'));
        this.app.use(this.paths.categoria,require('../routes/categorias'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Ejemplo corrienendo en: http://localhost: ${this.port}`)
        })
    }
}

module.exports = server