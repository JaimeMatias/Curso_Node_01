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

        
    }

    get params_openweather(){
        return {
            appid:process.env.OPENWHEATHER_KEY,
            'units':'metric'

        }
    }

    async clima(lat=0,lgn=0){
        try {
            const solicitud=axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lgn}`,
                params:this.params_openweather
            });
            const resp= await solicitud.get();
            const datos_nubes=resp.data.weather;
            const datos_clima=resp.data.main;
            return {
                Desc:datos_nubes[0].description,
                Temp:datos_clima.temp,
                Temp_min:datos_clima.temp_min,
                Temp_max:datos_clima.temp_max,
            }

        } catch (error) {
            console.log(`Genera error la consulta Clima ${error}`.red )
            return []
        }
    }
}


module.exports = {
    Busquedas
}