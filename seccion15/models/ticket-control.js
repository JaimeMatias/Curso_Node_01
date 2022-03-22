const DBTicketControl = require('./db_ticket_control');
const DBTicket = require('./db_ticket');
const Ticket = require('./ticket');




class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate() //Obtengo la fecha
        this.tickets = [];//Para que esto funcione en este campo se debe almacenar el UID de la base de datos de tickets
        this.ultimos4 = []; //Para que esto funcione en este campo se debe almacenar el UID de la base de datos de tickets
        this.ultimos4data=[];//Se va a almacenar la información de los ultimos 4 tickets
        this._id = "622feff95ab291211725f710";
        this.init();
    }

    // Funciones
    get toDb() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        }
    }
    async init() {


        const db_ticket_control = await DBTicketControl.findById(this._id);
        console.log(`Clase Controlador inicializada ${db_ticket_control}`);
        //console.log(db_ticket_control)
        const { hoy, tickets, ultimo, ultimos4 } = db_ticket_control;

        if (hoy === this.hoy) {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        } else {
            await this.guardarDB();
        }
    }


    guardarDB = async () => {
        const dbticketcontrol = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        await DBTicketControl.findByIdAndUpdate(this._id, dbticketcontrol)
        console.log(`Cambios guardados base Datos `)
    };

    siguiente = async () => {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        const { _id } = ticket;
        this.tickets.push(_id);
        await this.guardarDB();

        return (ticket);
    };

    atenderTicket = async (datos) => {
        if (this.tickets.length === 0) {

            return null;
        }
        //atiendo el primer elemento de la lista
        const ticket = this.tickets[0];

        this.tickets.shift();//saco el primer elemento de la lista
        const cantTickets=this.tickets.length;
        const dbticket = await DBTicket.findByIdAndUpdate(ticket, { escritorio: datos }, { new: true }) //Actualizo la base de datos

        this.ultimos4.unshift(ticket);//añado en la primer posición de mi arreglo el ticket
        this.ultimos4data.unshift(dbticket);
        //console.log('Ultimos 4 Data:',this.ultimos4data)
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
            this.ultimos4data.splice(-1,1);
        }
        await this.guardarDB();
        return {dbticket,cantTickets}
    };


}

module.exports = TicketControl;// Las clases no se exportan entre corchetes
