const express = require('express')
const app = express()

const port=8080

app.get('/', (req, res) =>{
    res.send('Hola Mundo')
})

app.get('/hola-mundo', (req, res) =>{
    res.send('Hola Mundo desde  su respectiva pagina')
})


app.get('*', (req, res) =>{
    res.send('404 | Pagina No encontrada')
})

app.listen(port, ()=>{
    console.log(`Ejemplo corrienendo en: http://localhost: ${port}`)
}

)