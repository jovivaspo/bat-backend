/*MODULES*/
const {Router} = require('express')

/*CONTROLLERS*/
const userCtrl  = require('../controllers/userController')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')
const verifyTokenUser = require('../middleware/verifyTokenUser')


const router = Router()

/*USERS*/
/*Routes eneables by the admin*/
router.get('/', verifyTokenAdmin, userCtrl.getAllUsers)
router.post('/register', verifyTokenAdmin, userCtrl.createUser)
router.delete('/delete/users', verifyTokenAdmin, userCtrl.deleteAllUser)
router.delete('/delete/:id', verifyTokenAdmin, userCtrl.deleteUser)

/*Routes eneables by the admin and normal users*/
router.get('/:id', verifyTokenUser, userCtrl.getOneUser)
router.put('/update/:id', verifyTokenUser , userCtrl.updateUser)

/*General actions*/
router.get('/confirm/:token', userCtrl.confirm)
router.post('/resend', userCtrl.resendEmail)
router.post('/login', userCtrl.loginUser)







module.exports = router