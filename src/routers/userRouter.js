/*MODULES*/
const {Router} = require('express')

/*CONTROLLERS*/
const userCtrl  = require('../controllers/userController')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')
const verifyTokenUser = require('../middleware/verifyTokenUser')


const router = Router()

/*USERS*/
router.get('/', verifyTokenAdmin, userCtrl.getAllUsers)
router.get('/:id', verifyTokenUser, userCtrl.getOneUser)
router.post('/register', verifyTokenAdmin, userCtrl.createUser)
router.get('/confirm/:token', userCtrl.confirm)
router.post('/login', userCtrl.loginUser)
router.delete('/delete/users', verifyTokenAdmin, userCtrl.deleteAllUser)
router.delete('/delete/:id', verifyTokenAdmin, userCtrl.deleteUser)
router.put('/update/:id', verifyTokenUser , userCtrl.updateUser)





module.exports = router