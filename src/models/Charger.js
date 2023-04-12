const { Schema, model, models } = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Charger:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del cargador
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: Lista de usuarios asociados al cargador
 *         uses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Uses'
 *           description: Lista de usos del cargador
 *         state:
 *           type: string
 *           enum:
 *             - free
 *             - working
 *             - fault
 *             - locked
 *           default: free
 *           description: Estado actual del cargador
 *       example:
 *         name: Cargador 1
 *         users: []
 *         uses: []
 *         state: free
 */

const chargerSchema = new Schema({
    name: {type:String},
    users:[{type:Schema.Types.ObjectId, ref:'User'}],
    uses:[{type:Schema.Types.ObjectId,ref:'Uses'}],
    state: {
        type: [{
            type: String,
            enum: ['free', 'working', 'fault', 'locked']
        }],
        default: 'free'
    }
}, {
    timestamps: true,
    versionKey: false
})


chargerSchema.set('toJSON', {
    transform: (document, returnObject) => {
        delete returnObject.__v
    }
})

module.exports = models.Charger || model("Charger", chargerSchema)
