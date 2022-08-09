const { Schema, model, models } = require('mongoose')

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
