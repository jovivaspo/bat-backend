const { Schema, model, models } = require('mongoose')

 /**
 * @swagger
 * components:
 *   schemas:
 *     Uses:
 *       type: object
 *       required:
 *         - user
 *         - charger
 *         - dateInit
 *         - dateEnd
 *       properties:
 *         user:
 *           type: string
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: "61516f8c5a10734fb7581e0b"
 *         charger:
 *           type: string
 *           description: Identificador del cargador utilizado
 *           example: "61516f8c5a10734fb7581e0b"
 *         dateInit:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de inicio del uso
 *           example: "2023-04-12T12:34:56.789Z"
 *         dateEnd:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de fin del uso
 *           example: "2023-04-12T13:00:00.000Z"
 *         consumption:
 *           type: number
 *           description: Consumo en kWh durante el uso
 *           example: 1.5
 *       example:
 *         user: "61516f8c5a10734fb7581e0a"
 *         charger: "61516f8c5a10734fb7581e0b"
 *         dateInit: "2023-04-12T12:34:56.789Z"
 *         dateEnd: "2023-04-12T13:00:00.000Z"
 *         consumption: 1.5
 */

 

const usesSchema = new Schema({
   user:{type:Schema.Types.ObjectId,ref:'User'},
   charger:{type:Schema.Types.ObjectId,ref:'Charger'},
   dateInit:{
    type:Date,
    required:[true, 'Date init is required']
   },
   dateEnd:{
    type:Date,
    required:[true, 'Date end is required']
   },
   consumption:{
        type:Number
   }
}, {
    timestamps: true,
    versionKey: false
})


usesSchema.set('toJSON', {
    transform: (document, returnObject) => {
        delete returnObject.__v
    }
})

module.exports = models.Uses || model("Uses", usesSchema)
