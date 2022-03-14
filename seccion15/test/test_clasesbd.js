const {DBTicket,DBTicketControl}=require('../models');
const mongoose =require('mongoose');
const {MongoClient}=require('mongodb');
require('dotenv').config();
const cors = require('cors');

const uri="mongodb+srv://Node_User_Cafe:M9MxbGzjPTSZl5ry12as@miclustercafe.immqo.mongodb.net/Sockets"
main =async()=>{

console.log(uri)
try {
    await db_connection();
      const tickets={
        nombre:"Ticket 1",
        hoy:new Date()
    };
    const tickets_new = new DBTicketControl(tickets);
    await tickets_new.save()
   
    const prueba1= await DBTicketControl.findById(_id="622aad30870e8fa30ce9d463");
    console.log(tickets_new)
} catch (error) {
console.log(error)    
}

//Sentencia para crear un nuevo objeto en la base de datos



//Sentencia para guardarlo en la base de datos


}

const db_connection =async()=>{
try {
    await mongoose.connect(uri,{
    });
    console.log('Base de Datos Conectada Correctamente');
} catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la base de datos');
}
};

 const prueba=main()