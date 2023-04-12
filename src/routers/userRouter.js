/*MODULES*/
const {Router} = require('express')

/*CONTROLLERS*/
const userCtrl  = require('../controllers/userController')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')
const verifyTokenUser = require('../middleware/verifyTokenUser')

/*USERS*/
const router = Router()

/*General actions*/
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login de un usuarios.
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: object   
 *               items:
 *                 $ref: '#/components/schemas/User'

*/
router.post('/login', userCtrl.loginUser)
router.get('/confirm/:token', userCtrl.confirm)
router.post('/resend', userCtrl.resendEmail)

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtener todos los usuarios.
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de todos los usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object   
 *               items:
 *                 $ref: '#/components/schemas/User'

*/

/*Routes eneables by the admin*/
router.get('/', verifyTokenAdmin, userCtrl.getAllUsers)
router.post('/register', verifyTokenAdmin, userCtrl.createUser)
router.delete('/delete/users', verifyTokenAdmin, userCtrl.deleteAllUser)
router.delete('/delete/:id', verifyTokenAdmin, userCtrl.deleteUser)

/*Routes eneables by the admin and normal users*/
router.get('/:id', verifyTokenUser, userCtrl.getOneUser)
router.put('/update/:id', verifyTokenUser , userCtrl.updateUser)









module.exports = router