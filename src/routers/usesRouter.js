/*MODULES*/
const {Router} = require('express')

/*CONTROLLERS*/
const usesCtrl = require('../controllers/usesController')

const router = Router()

/*USES*/
router.get('/all', usesCtrl.getAll)
router.get('/:id_user', usesCtrl.getAllUses)
router.post('/:id_user', usesCtrl.createUse)
router.get('/:id_user/:id', usesCtrl.getOneUse)
router.put('/:id_user/:id', usesCtrl.updateUse)
router.delete('/:id_user/:id', usesCtrl.deleteOneUse)



module.exports = router

