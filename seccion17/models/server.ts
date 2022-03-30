import express, { Application, Router } from 'express';
import UserRouter from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';
class Server {

    private app: Application;
    private port: string;
    private apiPath = {
        usuarios: '/api/usuarios' //Nombre del endpoint
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    routes() {
        this.app.use(this.apiPath.usuarios, UserRouter) //Vinculo las rutas definidas en la seccion de apiPath, con los metodos definidos en la carpeta de Routes
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Lectura del bodu
        this.app.use(express.json());

        //Carpeta Publica
        this.app.use(express.static('public'));
    };

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Base de Datos Conectada Correctamente')
        } catch (error) {
            throw new Error( 'Error al conectar a la base de datos' );
        }
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ' + this.port)
        })
    }

}

export default Server;