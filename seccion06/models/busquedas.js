const axios=require('axios');

class Busquedas{
    constructor(){
        }

    async ciudad(lugar=''){
        try {
            const resp= await axios.get('https://reqres.in/api/users?page=2');
            //console.log(lugar);
            console.log(resp.data);

        } catch (error) {
            return [];
        }
        
        return [];
    }
}


module.exports={
    Busquedas
}