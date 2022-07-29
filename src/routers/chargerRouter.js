/*MODULES*/
const {Router} = require('express')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')


/*CONTROLLERS*/
const chargerCtrl = require('../controllers/chargerController')


const router = Router()

/*USERS*/
router.get('/all', verifyTokenAdmin,  chargerCtrl.getAll)
router.post('/', verifyTokenAdmin,  chargerCtrl.create)
router.delete('/:id',verifyTokenAdmin, chargerCtrl.delete)
router.get('/:id',verifyTokenAdmin, chargerCtrl.get)


module.exports = router