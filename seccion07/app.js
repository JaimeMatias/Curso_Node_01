
const express = require('express');
const hbs=require('hbs');
const app = express();
app.set('view engine','hbs');

require('dotenv').config();
const port=process.env.PORT;

//Handlebars
hbs.registerPartials(__dirname + '/views/partials',(err)=>{console.log(err)});

//Servir contenido estático
app.use(express.static('public')); //Middleware, se ejecuta antes que todo lo demas.

app.get('/', (req, res) =>{
    res.render('home',{
        nombre:'Matias Jaime',
        titulo: 'Curso de Node',
    });
})

app.get('/generic', (req, res) =>{
    res.render('generic');
})
app.get('/elements', (req, res) =>{
   res.render('elements');
})


app.get('*', (req, res) =>{
    // Cuando la ruta a la que se quiere acceder es distinta al as definidas anterior mente, despliegua en el navegador la pagina 404.html
    res.sendFile(__dirname + '/public/404.html')
})

app.listen(port, ()=>{
    console.log(`Ejemplo corrienendo en: http://localhost: ${port}`)
}
)