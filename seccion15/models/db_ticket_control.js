const {Schema,model}=require('mongoose')
const DBTicketControlSchema=Schema({
 ultimo:Number,
 hoy:Number,
 tickets:[
    {   type: Schema.Types.ObjectId,
        ref: 'DBTicket',
    }
],
ultimos4:[
    {   type: Schema.Types.ObjectId,
        ref: 'DBTicket',
    }
],
})

module.exports=model('DBTicketControl', DBTicketControlSchema) //De esta manera renombro el Schema