const { Schema, model, models } = require('mongoose')

const chargerSchema = new Schema({
    name: {type:String},
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
