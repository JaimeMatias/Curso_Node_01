const Tarea = require('./tarea')
class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    };

    crear_tarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargar_tarea(datos) {
        datos.forEach(element => {

            this._listado[element.id] = element;

        }
        )
    };

    listado_completo() {
        let cont = 1;
        console.log();
        console.log(this._listado);
        Object.keys(this._listado).forEach(
            element => {
                let salida = ''
                if (!!this._listado[element].completado_en) {
                    salida = `${cont.toString().green}. ${this._listado[element].desc} :: ${'Completado'.green}  `;
                }
                else {
                    salida = `${cont.toString().green}. ${this._listado[element].desc} :: ${'Pendiente'.red} `;
                };


                console.log(salida);
                cont++;
            }
        )
    };

    get listado_arr() {
        const salida = [];
        Object.keys(this._listado).forEach(
            key => {
                salida.push(this._listado[key])
            }
        )
        return salida
    }
};

module.exports = Tareas;