const express = require('express');
require('dotenv').config();

class server {
    constructor(){
        this.app=express();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
        this.port=process.env.PORT;

    }

    middlewares(){
        //Directorio Publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get('/api', (req, res) =>{
            res.json({
                'msg':"Get API",
            });
                      
        });
        this.app.put('/api', (req, res) =>{
            res.json({
                'msg':"Put API",
            });
           
            
        });
        this.app.post('/api', (req, res) =>{
            res.json({
                'msg':"Post API",
            });
           
            
        });
        this.app.delete('/api', (req, res) =>{
            res.json({
                'msg':"Delete API",
            });
            
        });
        
        this.app.patch('/api', (req, res) =>{
            res.json({
                'msg':"Patch API",
            });
            
        });
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Ejemplo corrienendo en: http://localhost: ${this.port}`)})
}
}

module.exports=server