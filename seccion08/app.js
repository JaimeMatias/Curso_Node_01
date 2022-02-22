const express = require('express');
const app = express();
console.log('Hola Mundo');
require('dotenv').config();
const port=process.env.PORT;


app.get('/', (req, res) =>{
    res.write('Hola Mundo');
    res.end();
})


app.listen(port, ()=>{
    console.log(`Ejemplo corrienendo en: http://localhost: ${port}`)
}

)