const URL = ""
const fetchingDataFromServerCharger = async () => {

    try{

        const res = await fetch(URL)
   
        const data = res.json()

        console.log(json)

        /*ACTUALIZAR BASE DE DATOS CON VALORES DE CORRIENTE, CARGADOR ...*/

    }catch(error){
        console.log(error)
    }
 
}