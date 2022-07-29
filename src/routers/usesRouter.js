/*MODULES*/
const {Router} = require('express')

/*CONTROLLERS*/
const usesCtrl = require('../controllers/usesController')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')
const verifyTokenUser = require('../middleware/verifyTokenUser')

const router = Router()

/*USES*/
router.get('/all', verifyTokenAdmin , usesCtrl.getAll)
router.get('/:id_user', verifyTokenUser , usesCtrl.getAllUses)
router.post('/:id_user', verifyTokenUser,  usesCtrl.createUse)
router.get('/:id_user/:id', verifyTokenUser, usesCtrl.getOneUse)
router.put('/:id_user/:id', verifyTokenUser, usesCtrl.updateUse)
router.delete('/:id_user/:id', verifyTokenUser, usesCtrl.deleteOneUse)



module.exports = router

