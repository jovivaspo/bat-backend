/*MODULES*/
const { config } = require('dotenv')
const User = require('../models/User')
const Uses = require('../models/Uses')
const Charger = require('../models/Charger')

const usesCtrl = {}

usesCtrl.getAllUses = async (req, res, next) => {

    try {

        const { id_user } = req.params

        const user = await User.findById(id_user)

        if (!user) {
            const error = new Error('Usuario no encontrado')
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
        const { dateInit, dateEnd, id_charger } = req.body

        if(!id_charger || !dateInit || !dateEnd){
            const error = new Error('Petición incorrecta')
            res.status(400)
            return next(error)
        }

        const user = await User.findById(id_user)
        const charger = await Charger.findById(id_charger)

        if (!user || !charger) {
            const error = new Error('Usuario o cargador no encontrado')
            res.status(404)
            return next(error)
        }

        const newUse = new Uses({
            user: id_user,
            charger: id_charger,
            dateInit: new Date(dateInit),
            dateEnd: new Date(dateEnd),
            consumption: 0
        })

        const useSaved = await newUse.save()

        user.uses = user.uses.concat(useSaved.id)

        charger.uses = charger.uses.concat(useSaved.id)

        await user.save()

        await charger.save()

        return res.status(201).json({ message:"Uso creado", use: useSaved, user })

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
            const error = new Error('Usuario no encontrado')
            res.status(404)
            return next(error)
        }

        const use = await Uses.findById(id)

        if (!use) {
            const error = new Error('Uso no encontrado')
            res.status(404)
            return next(error)
        }

        return res.status(200).json({use})

    } catch (error) {
        console.log(error)
        next(error)
    }
}

usesCtrl.updateUse = async (req, res, next) => {
    try {
        const { id_user, id } = req.params
        const { body } = req

        //console.log(body)

        const user = await User.findById(id_user)

        if (!user) {
            const error = new Error('Usuario no encontrado')
            res.status(404)
            return next(error)
        }

        const use = await Uses.findById(id)

        if (!use) {
            const error = new Error('Uso no encontrado')
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

       //console.log(useUpdated)

        return res.status(201).json({  message: 'Uso actualizado', useUpdated })

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
            const error = new Error('Usuario no encontrado')
            res.status(404)
            return next(error)
        }

        const use = await Uses.findByIdAndDelete(id)

        if (!use) {
            const error = new Error('Uso no encontrado')
            res.status(404)
            return next(error)
        }

        const charger = await Charger.findById(use.charger)

        if (!charger) {
            const error = new Error('Cargador no encontrado')
            res.status(404)
            return next(error)
        }

        charger.uses = charger.uses.filter(use => use.toString() !== id)

        user.uses = user.uses.filter(use => use.toString() !== id)

        await charger.save()

        const userUpdated = await user.save()

        return res.status(201).json({
            message: 'Uso borrado',
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

       return res.status(200).json({
       uses
       })
    } catch (error) {
        console.log(error)
        next(error)
    }
}









module.exports = usesCtrl