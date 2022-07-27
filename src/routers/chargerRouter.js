/*MODULES*/
const {Router} = require('express')


/*CONTROLLERS*/
const chargerCtrl = require('../controllers/chargerController')


const router = Router()

/*USERS*/
router.get('/all', chargerCtrl.getAll)
router.post('/', chargerCtrl.create)
router.delete('/:id', chargerCtrl.delete)
router.get('/:id', chargerCtrl.get)


module.exports = router