const {Schema,model}=require('mongoose')
const DBTicketControlSchema=Schema({
 ultimo:Number,
 hoy:Date,

})

module.exports=model('DBTicketControl', DBTicketControlSchema) //De esta manera renombro el Schema