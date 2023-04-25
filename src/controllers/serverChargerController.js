 const serverChargerCtrl = {}

 serverChargerCtrl.getData = (req, res, next) => {
   const body = req.body

   /*ACTUALIZA BASE DE DATOS: CARGADOR, CORRIENTE DEL USO CORRESPONDIENTE, ESTADO CARGADOR*/

   return res.status(200).json(body)
 }


 module.exports = serverChargerCtrl