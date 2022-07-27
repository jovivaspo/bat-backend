/*MODULES*/
const { config } = require('dotenv')
const User = require('../models/User')
const Uses = require('../models/Uses')

const usesCtrl = {}

usesCtrl.getAllUses = async (req, res, next) => {

    try {

        const { id_user } = req.params

        const user = await User.findById(id_user)

        if (!user) {
            const error = new Error('User not found')
            res.status(404)
            next(error)
        }

        return res.status(200).json({ uses: user.uses })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

usesCtrl.createUse = async (req, res, next) => {
    try {
        const { id_user } = req.params
        const { dateInit, dateEnd } = req.body

        const user = await User.findById(id_user)

        if (!user) {
            const error = new Error('User not found')
            res.status(404)
            next(error)
        }

        const newUse = new Uses({
            user: id_user,
            dateInit: new Date(dateInit),
            dateEnd: new Date(dateEnd),
            consumption: 0
        })

        const useSaved = await newUse.save()

        user.uses = user.uses.concat(useSaved.id)

        await user.save()

        return res.status(202).json({ useSaved })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

usesCtrl.getOneUse = async (req, res, next) => {
    try {
        const { id_user, id } = req.params

        const user = await User.findById(id_user)

        if (!user) {
            const error = new Error('User not found')
            res.status(404)
            return next(error)
        }

        const use = await Uses.findById(id)

        if (!use) {
            const error = new Error('Use not found')
            res.status(404)
            return next(error)
        }

        return res.status(202).json({ message:"Use created",use, user })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

usesCtrl.updateUse = async (req, res, next) => {
    try {
        const { id_user, id } = req.params
        const { body } = req

        console.log(body)

        const user = await User.findById(id_user)

        if (!user) {
            const error = new Error('User not found')
            res.status(404)
            return next(error)
        }

        const use = await Uses.findById(id)

        if (!use) {
            const error = new Error('Use not found')
            res.status(404)
            return next(error)
        }


        let keys = Object.keys(body)

        await Promise.all(keys.map(async (key) => {
            if (key === 'dateInit') {
                await Uses.findByIdAndUpdate(id, {
                    dateInit: new Date(body[key])
                })
            }
            if (key === 'dateEnd') {
                await Uses.findByIdAndUpdate(id, {
                    dateEnd: new Date(body[key])
                })
            }
        }))

        const useUpdated = await Uses.findById(id)

        return res.status(201).json({  message: 'Use Updated', useUpdated })

    } catch (error) {
        console.log(error)
        next(error)
    }
}


usesCtrl.deleteOneUse = async (req, res, next) => {
    try {
        const { id_user, id } = req.params

        const user = await User.findById(id_user)

        if (!user) {
            const error = new Error('User not found')
            res.status(404)
            return next(error)
        }

        const use = await Uses.findByIdAndDelete(id)

        if (!use) {
            const error = new Error('Use not found')
            res.status(404)
            return next(error)
        }

        user.uses = user.uses.filter(use => use.toString() !== id)

        const userUpdated = await user.save()


        return res.status(201).json({
            message: 'Use deleted',
            user: userUpdated
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

usesCtrl.getAll = async (req, res, next) => {
    try {
       const uses = await Uses.find()

       return res.status(202).json({
       uses
       })
    } catch (error) {
        console.log(error)
        next(error)
    }
}









module.exports = usesCtrl