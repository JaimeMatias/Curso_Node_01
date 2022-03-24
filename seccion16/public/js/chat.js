//const { validarJWT } = require("../../middlewares");

let usuario=null;
let socket=null;
var url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth/'
    : 'https://restserver-curso-fher.herokuapp.com/api/auth/';

const validarJWT =async()=>{
    const token=localStorage.getItem('token')||'';
    if (token.length<=10){
        window.location='index.html';
        throw new Error('No hay token en el servidor');
    }
    const resp= await fetch(url,{
        headers:{'x-token':token}
    });

    const {usuario:userDB,token:TokenDB}=await resp.json()
    console.log(userDB,TokenDB)
    localStorage.setItem('token',TokenDB);
    usuario=userDB
}

const main=async()=>{
await validarJWT();
}
main()
//const socket=io()
