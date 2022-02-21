const express = require('express');
const app = express();
app.set('view engine','hbs');
const port=8080;

//Servir contenido estático
app.use(express.static('public')); //Middleware, se ejecuta antes que todo lo demas.

app.get('/', (req, res) =>{
    res.render('home');
})

app.get('/generic', (req, res) =>{
    res.sendFile(__dirname + '/public/generic.html')
})
app.get('/elements', (req, res) =>{
    res.sendFile(__dirname + '/public/elements.html')
})


app.get('*', (req, res) =>{
    // Cuando la ruta a la que se quiere acceder es distinta al as definidas anterior mente, despliegua en el navegador la pagina 404.html
    res.sendFile(__dirname + '/public/404.html')
})

app.listen(port, ()=>{
    console.log(`Ejemplo corrienendo en: http://localhost: ${port}`)
}

)