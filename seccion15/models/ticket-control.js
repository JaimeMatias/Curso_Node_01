const DBTicketControl = require('./db_ticket_control');
const DBTicket = require('./db_ticket');
const Ticket = require('./ticket');




class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate() //Obtengo la fecha
        this.tickets = [];//Para que esto funcione en este campo se debe almacenar el UID de la base de datos de tickets
        this.ultimos4 = []; //Para que esto funcione en este campo se debe almacenar el UID de la base de datos de tickets
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
        const { _id, numero } = ticket;
        this.tickets.push(_id);
        await this.guardarDB();
        const salida = `Ticket: ${numero}`
        console.log(salida)
        return(salida);
    };
    atenderTicket = async (datos) => {
        if (this.tickets.length === 0) {
            return null;
        }
        console.log(datos)
        //atiendo el primer elemento de la lista
        const ticket = this.tickets[0];
        console.log(ticket)
        const ticket_db = DBTicket.findById(ticket)

        this.tickets.shift();//saco el primer elemento de la lista
        await DBTicket.findByIdAndUpdate(ticket, { escritorio: datos })
        this.ultimos4.unshift(ticket);//añado en la primer posición de mi arreglo el ticket
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }
        await this.guardarDB();
        return ticket
    };
}

module.exports = TicketControl;// Las clases no se exportan entre corchetes
