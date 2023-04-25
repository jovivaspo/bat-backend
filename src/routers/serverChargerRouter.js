const {Router} = require('express')
const serverChargerCtrl = require('../controllers/serverChargerController')

const router = Router()

router.post('/', serverChargerCtrl.getData)


module.exports = router