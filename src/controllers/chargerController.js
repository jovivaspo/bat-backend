/*MODULES*/
const Charger = require('../models/Charger')

const chargerCtrl = {}

chargerCtrl.create = async (req, res, next) => {

    try {

        const { name } = req.body

        const charger = new Charger({ name })

        const chargerSaved = await charger.save()

        return res.status(202).json({
            message: "New charger created",
            chargerSaved
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

chargerCtrl.delete = async (req, res, next) => {

    try {

        const {id}= req.params

        await Charger.findByIdAndDelete(id)

        return res.status(202).json({
            message: "Charger deleted",
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

chargerCtrl.get = async (req, res, next) => {

    try {

        const {id}= req.params

        const charger = await Charger.findById(id)

        return res.status(200).json({
           charger
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

chargerCtrl.getAll = async (req, res, next) => {

    try {

       const chargers = await Charger.find()

        return res.status(200).json({
           chargers
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = chargerCtrl