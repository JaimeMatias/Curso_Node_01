const express = require('express');
const cors = require('cors');
const fileUpload =require('express-fileupload');
require('dotenv').config();

const {db_connection}=require('../database/config')

class server {
    constructor() {
        this.app = express();
        //Las rutas en la pagina web
        this.paths={
            auth:'/api/auth',
            buscar:'/api/buscar',
            categoria:'/api/categoria',
            usuarios:'/api/usuarios',
            productos:'/api/productos',
            uploads:'/api/uploads'
            
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
    middlewares() {//Todos los middlewares usan la palabra reservada use
        // CORS
        this.app.use(cors());

        //Lectura y Parseo del Body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));

        //Fileupload
        this.app.use(
            fileUpload({
                useTempFiles:true,
                temFileDir:'/tmp/',
                createParentPath:true,
            })
        )
    }

    routes() {
        //A donde consultar cuando se accede a cada ruta en la pagina web
        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.usuarios,require('../routes/user'));
        this.app.use(this.paths.categoria,require('../routes/categorias'));
        this.app.use(this.paths.productos,require('../routes/productos'));
        this.app.use(this.paths.buscar,require('../routes/buscar'));
        this.app.use(this.paths.uploads,require('../routes/uploads'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Ejemplo corrienendo en: http://localhost: ${this.port}`)
        })
    }
}

module.exports = server