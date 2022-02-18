const axios = require('axios');

class Busquedas {
    constructor() {
    }

    get params_mapbox() {
        //Los Metodos gets, no utilizan parentesis cuando se los llama
        return {
            'language': 'es',
            'access_token':process.env.MAPBOX_KEY,
            'limit': 5,

        }
    }
    async ciudad(lugar = '') {
        try {
            const instance = axios.create({

                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.params_mapbox
            });

            const resp = await instance.get();
            return resp.data.features.map(lugar =>({
                id:lugar.id,
                nombre:lugar.place_name,
                Lng:lugar.center[0],
                Lat:lugar.center[1],

            }))
            
        } catch (error) {
            return [];
        }

        return [];
    }
}


module.exports = {
    Busquedas
}