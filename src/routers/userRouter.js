/*MODULES*/
const {Router} = require('express')

/*CONTROLLERS*/
const userCtrl  = require('../controllers/userController')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')
const verifyTokenUser = require('../middleware/verifyTokenUser')

/*USERS*/
/*Routes eneables by the admin*/
const router = Router()


/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all user.
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object   
 *               items:
 *                 $ref: '#/components/schemas/User'
*/
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