import express,{Application, Router} from 'express';
import UserRouter from '../routes/usuario';
class Server {
 
    private app:Application;
    private port:string;
    private apiPath={
        usuarios:'/api/usuarios' //Nombre del endpoint
    }
    
    constructor(){
        this.app=express();
        this.port=process.env.PORT ||'8080';
        this.routes()
    }

    routes(){
        this.app.use(this.apiPath.usuarios,UserRouter) //Vinculo las rutas definidas en la seccion de apiPath, con los metodos definidos en la carpeta de Routes
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto: '+this.port)
        })
    }

}

export default Server;