const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fileUpload =require('express-fileupload');

class server {
    constructor() {
        this.app = express();
        //Las rutas en la pagina web
        this.paths={

            
        }

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
        this.port = process.env.PORT;

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
        this.app.listen(this.port, () => {
            console.log(`Ejemplo corrienendo en: http://localhost: ${this.port}`)
        })
    }
}

module.exports = server