/*MODULES*/
const {Router} = require('express')

/*CONTROLLERS*/
const userCtrl  = require('../controllers/userController')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')
const verifyTokenUser = require('../middleware/verifyTokenUser')


const router = Router()

/*Rutas generales*/

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginErrorInvalidCredentials:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Las credenciales proporcionadas son incorrectas
 *     LoginErrorUserNotRegistered:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: El usuario no está registrado
 *     LoginErrorEmailNotVerified:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: La dirección de correo electrónico no ha sido verificada
 *     PermisoDenegado:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Pemiso denegado
 *     ErrorSevidor:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Error interno del servidor
 *     EmailRegistrado:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Email en uso
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: Iniciar sesión de un usuario existente con su correo electrónico y contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Se inició sesión correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 id:
 *                  type: string
 *                 token:
 *                   type: string
 *       '401':
 *         description: Error al iniciar sesión
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/LoginErrorInvalidCredentials'
 *                 - $ref: '#/components/schemas/LoginErrorUserNotRegistered'
 *                 - $ref: '#/components/schemas/LoginErrorEmailNotVerified'
 *     tags:
 *       - User Rutas Generales
 *
 */

/**
 * @swagger
 * /user/renew-token:
 *   post:
 *     summary: Renovar el token.
 *     description: Reenvar token.
 *     parameters:
 *       - in: path
 *         name: token
 *         description: Token de verificación enviado por correo electrónico
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Token renovado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 id:
 *                  type: string
 *                 token:
 *                   type: string
 *       '401':
 *         description: Permiso denegado
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/PermisoDenegado'
 *               
 *     tags:
 *       - User Rutas Generales
 *
 */

/**
 * @swagger
 * /user/confirm/{token}:
 *   get:
 *     summary: Verificar cuenta
 *     description: Verificar cuenta de usuario a través de un token enviado por correo electrónico
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Cuenta verificada. Se devuelve un archivo HTML que redirige a la aplicación.
 *       '401':
 *         description: Permiso denegado
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/PermisoDenegado'
 *               
 *     tags:
 *        - User Rutas Generales
 *
 */

/**
 * @swagger
 * /user/resend:
 *   post:
 *     summary: Reenvío email de verificación de cuenta.
 *     description: Reenvío email de verificación de cuenta.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Correo de confirmación reenviado
 *       '401':
 *         description: Permiso denegado
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/PermisoDenegado'
 *               
 *     tags:
 *       - User Rutas Generales
 *
 */

router.post('/login', userCtrl.loginUser)
router.get('/confirm/:token', userCtrl.confirm)
router.post('/resend', userCtrl.resendEmail)

/*Rutas accesibles solo para el admin*/
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtener todos los usuarios
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de todos los usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object  
 *               properties:
 *                  users: 
 *                      items:
 *                      $ref: '#/components/schemas/User'
 *     tags:
 *          - User Rutas Admin  
 *
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Nombre del usuario
 *                          email:
 *                              type: string
 *                              description: Email usuario
 *                          password:
 *                              type: string
 *                              description: Password del usuario
 *     responses:
 *       '201':
 *         description: Nuevo usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: Usuario creado
 *                  user:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Nombre del usuario
 *                          email:
 *                               type: string
 *                               description: Email del usuario
 *       '401':
 *         description: Email en uso
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/EmailRegistrado'
 *     tags:
 *          - User Rutas Admin  
 *
 */

/**
 * @swagger
 * /user/delete/users:
 *   delete:
 *     summary: Borrar todos los usuarios
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Usuarios borrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: "Todos los usuarios fueron borrados"
 *     tags:
 *          - User Rutas Admin  
 *
 */

/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Borrar un usuario por id
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id del usuario a borrar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Usuario borrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: "Usuario borrado"
 *     tags:
 *         - User Rutas Admin  
 *
 */

router.get('/renew-token', verifyTokenUser, userCtrl.renewToken)
router.get('/', verifyTokenAdmin, userCtrl.getAllUsers)
router.post('/register', verifyTokenAdmin, userCtrl.createUser)
router.delete('/delete/users', verifyTokenAdmin, userCtrl.deleteAllUser)
router.delete('/delete/:id', verifyTokenAdmin, userCtrl.deleteUser)


/*Rutas accesibles para los usuarios*/


/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtener los datos de un usuario por id
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id del usuario a obtener
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                  user:
 *                      $ref: '#/components/schemas/User'   
 *       '404':
 *         description: Usuario no encontrado     
 *     tags:
 *         - User Rutas para Users 
 *
 */

/**
 * @swagger
 * /user/update/{id}:
 *   put:
 *     summary: Actualizar un usuario existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del usuario a actualizar.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Usuario actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '404':
 *         description: El usuario especificado no se ha encontrado
 *     tags:
 *          - User Rutas para Users
 *          
 */

router.get('/:id', verifyTokenUser, userCtrl.getOneUser)
router.put('/update/:id', verifyTokenUser , userCtrl.updateUser)









module.exports = router