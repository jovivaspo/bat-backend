/*MODULES*/
const User = require('../models/User')
const createToken = require('../services/createToken')
const sendEmail = require('../services/sendEmail')
const path = require('path')
const jwt = require('jsonwebtoken')
const config = require('../config')

const userCtrl = {}

userCtrl.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()

        return res.status(200).json(users)

    } catch (error) {
        console.log(error)
        next(error)
    }
}

userCtrl.getOneUser = async (req, res, next) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)

        if (user) {
            return res.status(200).json({user})
        } else {
            const error = new Error('Usuario no encontrado')
            res.status(404)
            return next(error)
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
}

userCtrl.createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const user = await User.find({ email: email })

        if (user.length > 0) {
            return res.status(401).json({ message: "Email en uso" })
        } else {

            const newUser = new User({
                name,
                password,
                email
            })

            newUser.password = await newUser.encryptPassword(password)

            const userSaved = await newUser.save()

            const token = createToken(userSaved._id, userSaved.email)

            await sendEmail(userSaved.email, token)

            return res.status(201).json({
                message: 'Usuario creado',
                user: {
                    email,
                    id: userSaved._id
                }
            })
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
}

userCtrl.confirm = async (req, res, next) => {
    try {
        const token = req.params.token

        jwt.verify(token, config.KEY, async (err, decodedToken) => {
            if (err) {
                res.status(401)
                const error = new Error(err.name)
                return res.sendFile(path.join(__dirname, '../static/errorToken.html'))
            }
            
            const user = await User.findOne({ email: decodedToken.email })
            console.log(user)
            if (!user  ||  user.verified === "Verified") {
                res.status(401)
                const error = new Error("Permiso denegado")
                return next(error)
            }
    
            user.verified = "Verified"

            const userSaved = await user.save()

            return res.sendFile(path.join(__dirname,'../static/confirm.html'))
        })


    } catch (error) {
        console.log(error)
        res.status(401)
        next(error)
    }
}

userCtrl.resendEmail = async (req, res, next) => {

    try {

        console.log('Reenviando')

        const email = req.body.email

        const user = await User.findOne({ email })

        if (!user) {
            const error = new Error("Email no registrado")
            res.status(401)
            return next(error)
        }

        const token = createToken(user._id, email)

        await sendEmail(email, token)

        return res.status(200).json({
            message: "Correo de confirmación reenviado",
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

userCtrl.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email })

        if (!user || user.length === 0) {
            console.log('Email no registrado, ', email)
            const error = new Error('Email no registrado')
            res.status(401)
            return next(error)
        }

        const match = await user.matchPassword(password)

        if (!match) {
            user.attempts++
            const userSaved = await user.save()
            console.log('Password incorrecta, ',email)
            const error = new Error('Password incorrecta')
            res.status(401)
            return res.status(401).json({
                error:error.message,
                attemps:userSaved.attempts
            })
        }

        const token = createToken(user._id, user.email)

        user.lastSession = new Date()

        user.attempts = 0

        const userSaved = await user.save()

        console.log("Inicio sesión: ", email)

        return res.status(201).json({ email: userSaved.email, id:userSaved._id , token })


    } catch (error) {
        console.log(error)
        next(error)
    }
}

userCtrl.deleteUser = async (req, res, next) => {
    try {

        const { id } = req.params

        const userDeleted = await User.findByIdAndDelete(id)

        if (!userDeleted) {
            const error = new Error('Usuario no existe')
            res.status(404)
            return next(error)
        }

        return res.status(201).json({
            message: `Usuario borrado ${userDeleted.name}`
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

userCtrl.deleteAllUser = async (req, res, next) => {
    try {

        await User.deleteMany({ role: "user" })

        return res.status(201).json({
            message: `Todos los usuarios fueron borrados`
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

userCtrl.renewToken = async (req, res, next) => {
    try {
        const { id, email } = req;
    
        const token = await createToken(id, email)
    
        return res.status(201).json({ id, email, token });
      } catch (error) {
        console.log(error);
        next(error)
      }
}

//OJO SI SE ACTUALIZA EL CORREO EL TOKEN FALLARÁ
userCtrl.updateUser = async (req, res, next) => {
    try {

        const { id } = req.params

        const body = req.body

        const userUpdated = await User.findByIdAndUpdate(id, body)

        if (!userUpdated) {
            const error = new Error('Usuario no encontrado')
            res.status(404)
            return next(error)
        }


        return res.status(201).json({
            message: `Usuario actualizado`,
            user: userUpdated
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}






module.exports = userCtrl