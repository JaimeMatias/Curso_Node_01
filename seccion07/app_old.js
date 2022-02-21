const { Console } = require('console');
const http = require('http');

http.createServer((req, res) => {


    //res.setHeader('Content-Disposition','attachment;filename=lista.csv')
    //res.writeHead(200,{'Content-Type':'application/csv'});
    const persona={
        id:1,
        nombre:'Fernando',
    };


    //res.write(JSON.stringify(persona));
    res.write('Hola Mundo');
    res.end();
}).listen(8080);

console.log('Escuchando en el puerto ' + 8080)