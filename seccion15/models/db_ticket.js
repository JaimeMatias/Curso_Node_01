const {Schema,model}=require('mongoose')
const DBTicket=Schema({

numero:Number,
escritorio:String,
completado:Boolean,
})

module.exports=model('DBTicket', DBTicket) //De esta manera renombro el Schema