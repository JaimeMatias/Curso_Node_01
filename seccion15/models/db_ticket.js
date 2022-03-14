const {Schema,model}=require('mongoose')
const DBTicket=Schema({
nombre:String,
 numero:Number,

})

module.exports=model('DBTicket', DBTicket) //De esta manera renombro el Schema