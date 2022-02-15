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

    get listado_arr() { 
        const salida=[];
        Object.keys(this._listado).forEach( 
            key=>{
                salida.push(this._listado[key])
            }
        )
        return salida
    }
};

module.exports = Tareas;