const express = require('express');
require('dotenv').config();

class server {
    constructor(){
        this.app=express();
        this.middlewares();
        this.routes();
        this.port=process.env.PORT;

    }

    middlewares(){
        //Directorio Publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get('/', (req, res) =>{
            res.send('Hello World');
            // res.sendFile(+'./public/index.html',(err)=>{
            //     console.log(err);
            // })
            
        })
        
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Ejemplo corrienendo en: http://localhost: ${this.port}`)})
}
}

module.exports=server