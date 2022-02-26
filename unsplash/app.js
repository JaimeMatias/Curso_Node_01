const express = require('express');
const app=express(); // Instanción la applicación
const port=8082;

require('dotenv').config(); // Sirve para llamar las variables definidas en el archivo .env
const Access_key=process.env.Access_key;


app.use(express.static('public'));// Indica la ruta de donde sacar el contenido que se va a mostar en la pagina web


app.listen(port, ()=>{ //Monta el servidor en el cual se va a alojar la pagina web
    console.log(`Ejemplo corrienendo en: http://localhost: ${port}`)
    console.log(`La Access_key es ${Access_key}`)
});