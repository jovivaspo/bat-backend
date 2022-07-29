/*MODULES*/
const User = require('../models/User')
const createToken = require('../services/createToken')
const sendEmail = require('../services/sendEmail')

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
            return res.status(200).json(user)
        } else {
            const error = new Error('User does not found')
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
            return res.status(200).json({ message: "Email in use" })
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
                message: 'User created',
                user: {
                    name,
                    email
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

        const decodedToken = jwt.verify(token, config.KEY)

        if (!token || !decodedToken.id) {
            res.status(401)
            const error = new Error("Token invalido")
            return next(error)
        }

        const user = await User.findOne({ email: decodedToken.email })

        if (!user) {
            const error = new Error("Este correo es inválido")
            res.status(401)
            return next(error)
        }

        user.verified = "Verified"

        const userSaved = await user.save()

        const newToken = createToken(userSaved._id, userSaved.email)

        return res.status(200).json({
            token: newToken,
            user: userSaved
        })

    } catch (error) {
        console.log(error)
        res.status(401)
        next(error)
    }
}

userCtrl.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email })

        if (!user || user.length === 0) {
            const error = new Error('Email not exist')
            res.status(401)
            return next(error)
        }
        const match = await user.matchPassword(password)

        if (!match) {
            const error = new Error('Password incorrect')
            res.status(401)
            return next(error)
        }

        const token = createToken(user._id, user.email)

        return res.status(201).json({ user, token })


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
            const error = new Error('User not exist')
            res.status(404)
            return next(error)
        }

        return res.status(201).json({
            message: `User deleted ${userDeleted.name}`
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
            message: `Users deleted`
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}


userCtrl.updateUser = async (req, res, next) => {
    try {

        const { id } = req.params

        const body = req.body

        const userUpdated = await User.findByIdAndUpdate(id, body)

        if (!userUpdated) {
            const error = new Error('User not exist')
            res.status(404)
            return next(error)
        }


        return res.status(201).json({
            message: `User updated`,
            user: userUpdated
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}






module.exports = userCtrl