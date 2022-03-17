const DBTicketControl=require('../models/db_ticket_control');//Si lo pongo entre cochetes se rompe
const mongoose =require('mongoose');
require('dotenv').config();
const uri="mongodb+srv://Node_User_Cafe:M9MxbGzjPTSZl5ry12as@miclustercafe.immqo.mongodb.net/Sockets"
main =async()=>{


try {
    await db_connection();
      const tickets={
        nombre:"Ticket 1",
        hoy:new Date().getDate(),
        ultimo:0
    };
    console.log(tickets)
    const tickets_new = new DBTicketControl(tickets);
    await tickets_new.save()
    console.log(tickets_new)
    const prueba1= await DBTicketControl.findById(_id="622f2c115ee17497be6d2078");
    console.log(prueba1)
} catch (error) {
console.log(error)    
}

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