/*MODULES*/
const { Schema, model, models } = require('mongoose')
const bcrypt = require('bcryptjs')
const sleep = require('../services/wait')

/**
 * @swagger
 * /**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *           example: Juan Pérez
 *         email:
 *           type: string
 *           description: Dirección de correo electrónico del usuario
 *           example: juan.perez@example.com
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *           example: 123456
 *         verified:
 *           type: string
 *           enum: 
 *             - Not verified
 *             - Verified
 *           description: Indica si la cuenta del usuario ha sido verificada o no
 *           default: Not verified
 *         role:
 *           type: string
 *           enum:
 *             - user
 *             - admin
 *           description: Rol del usuario en el sistema
 *           default: user
 *         uses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Uses'
 *           description: Lista de usos del usuario
 *         chargers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Charger'
 *           description: Lista de cargadores que ha utilizado el usuario
 *         lastSession:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la última sesión del usuario
 *         attempts:
 *           type: integer
 *           description: Número de intentos fallidos de inicio de sesión del usuario
 *           default: 0
 *       example:
 *         name: Juan Pérez
 *         email: juan.perez@example.com
 *         password: 123456
 *         verified: Not verified
 *         role: user
 *         uses: []
 *         chargers: []
 *         lastSession: "2023-04-12T12:34:56.789Z"
 *         attempts: 0
 */
 
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Email required"],
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
    uses:[{type:Schema.Types.ObjectId,ref:'Uses'}],
    chargers:[{type:Schema.Types.ObjectId,ref:'Charger'}],
    lastSession:{
        type:Date
    },
    attempts:{type:Number, default:0}
}, {
    timestamps: true,
    versionKey: false
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

userSchema.methods.matchPassword = async function (password) {
    await sleep(3000)
    return await bcrypt.compare(password, this.password)
}

userSchema.set('toJSON', {
    transform: (document, returnObject) => {
        delete returnObject.__v
        delete returnObject.password
    }
})

module.exports = models.User || model("User", userSchema)
