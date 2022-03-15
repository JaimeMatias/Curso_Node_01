const DBTicketControl=require('./db_ticket_control');
require('dotenv').config();
const mongoose =require('mongoose');
const {db_connection} = require('../databaseConnection/config')


class TicketControl{

constructor(){
    this.ultimo=0;
    this.hoy=new Date().getDate() //Obtengo la fecha
    this.tickets =[];//Para que esto funcione en este campo se debe almacenar el UID de la base de datos de tickets
    this.ultimos4=[]; //Para que esto funcione en este campo se debe almacenar el UID de la base de datos de tickets
    this.init();
}

// Funciones
get toDb(){
    return{
        ultimo:this.ultimo,
        hoy:this.hoy,
        tickets:this.tickets,
        ultimos4:this.ultimos4,
    }
}
async init(){

console.log('Clase inicializada');
const _id="622feff95ab291211725f710"
const db_ticket_control= await DBTicketControl.findById(_id);
console.log(db_ticket_control)
const {hoy,tickets,ultimo,ultimos4}=db_ticket_control;
console.log(new Date().getDate());
console.log(hoy===this.hoy)
if (hoy===this.hoy)
{
    this.tickets=tickets;
    this.ultimo=ultimo;
    this.ultimos4=ultimos4;
}else{
    await this.guardarDB(_id);
    console.log('Cambios reealizado')
}
}
guardarDB =async(valor)=>{
    const tickets={
       ultimo:this.ultimo,
       hoy:this.hoy,
       tickets:this.tickets,
       ultimos4:this.ultimos4
    };
await DBTicketControl.findByIdAndUpdate(valor,tickets)
}

}

module.exports=TicketControl;// Las clases no se exportan entre corchetes