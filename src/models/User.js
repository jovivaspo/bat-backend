/*MODULES*/
const { Schema, model, models } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Email required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password required"],
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,

    },
    verified: {
        type:String,
        enum:['Not verified', 'Verified'],
        default:'Not verified'
    },
    role: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: 'user'
    },
    uses:[{type:Schema.Types.ObjectId,ref:'Uses'}]
}, {
    timestamps: true,
    versionKey: false
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.set('toJSON', {
    transform: (document, returnObject) => {
        delete returnObject.__v
        delete returnObject.password
        delete returnObject.role
    }
})

module.exports = models.User || model("User", userSchema)
