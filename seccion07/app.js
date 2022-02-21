const express = require('express')
const app = express()

const port=8080

//Servir contenido estático
app.use(express.static('public')); //Middleware, se ejecuta antes que todo lo demas.

app.get('/', (req, res) =>{
    res.send('Hola Mundo')
})

app.get('/hola-mundo', (req, res) =>{
    res.send('Hola Mundo desde  su respectiva pagina')
})


app.get('*', (req, res) =>{
    res.sendFile(__dirname + '/public/404.html')
})

app.listen(port, ()=>{
    console.log(`Ejemplo corrienendo en: http://localhost: ${port}`)
}

)