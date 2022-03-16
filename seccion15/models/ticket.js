const DBTicket = require('./db_ticket');
class Ticket {
    constructor(numero, escritorio, completado = false) {
        this.numero = numero;
        this.escritorio = escritorio;
        this.completado = completado
        this.init();
    }
    //Funciones
    get datos() {
        return {
            _id: this._id,
            numero: this.numero,
            escritorio: this.escritorio,
            completado: this.completado,
        }
    }

    async init() {
        console.log('Clase Ticket inicializada')
        const dbticket = {
            numero: this.numero,
            escritorio: this.escritorio,
            completado: this.completado,
        };
        await this.guardarDB(dbticket)
    }

    guardarDB = async (valor) => {
        const new_dbticket = new DBTicket(valor);
        const { _id } = new_dbticket
        this._id = _id
        await new_dbticket.save()
    }
};

module.exports=Ticket