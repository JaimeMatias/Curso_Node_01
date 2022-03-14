
const Server =  require('./server');
const TicketControl=require('./ticket-control')
const DBTicketControl=require('./db_ticket_control')
const DBTicket=require('./db_ticket')
module.exports={
    Server,
    TicketControl,
    DBTicketControl,
    DBTicket
}