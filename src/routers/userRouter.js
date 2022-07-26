/*MODULES*/
const {Router} = require('express')

/*CONTROLLERS*/
const userCtrl  = require('../controllers/userController')

const router = Router()

router.get('/', userCtrl.getAllUsers)
router.get('/:id', userCtrl.getOneUser)
router.post('/register', userCtrl.createUser)
router.post('/login', userCtrl.loginUser)
router.delete('/delete/users', userCtrl.deleteAllUser)
router.delete('/delete/:id', userCtrl.deleteUser)
router.put('/update/:id', userCtrl.updateUser)


module.exports = router