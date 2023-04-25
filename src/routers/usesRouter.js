/*MODULES*/
const {Router} = require('express')

/*CONTROLLERS*/
const usesCtrl = require('../controllers/usesController')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')
const verifyTokenUser = require('../middleware/verifyTokenUser')

const router = Router()


/*Rutas accesibles para el admin*/
/**
 * @swagger
 * /uses/all:
 *  get: 
 *    summary: Obtener todos los usos de un usuario.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *       '200':
 *         description: Lista de todos los usos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  uses:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Uses'
 *       '404':
 *         description: Usuario no encontrado
 * 
 *    tags:
 *         - Uses Rutas Admin
 *        
 *      
 */

router.get('/all', verifyTokenAdmin , usesCtrl.getAll)

/*Rutas accesibles para el usuario*/
/**
 * @swagger
 * /uses/{id_user}:
 *   get:
 *     summary: Obtener todos los usos de un usuario
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_user
 *         description: Id del usuario del que se quieren obtener los usos.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de todos los usos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  uses:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Uses'
 *       '404':
 *         description: Usuario no encontrado
 * 
 *     tags:
 *         - Uses Rutas para Users
 *
 */

/**
 * @swagger
 * /uses/{id_user}:
 *   post:
 *      summary: Crear un nuevo uso
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: id_user
 *         description: Id del usuario que crea el uso
 *         required: true
 *         schema:
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          charger: 
 *                              type: string
 *                              description: id cargador en el cual se hace el uso
 *                          dateInit:
 *                              type: string
 *                              formtat: date-time
 *                              description: fecha y hora de inico del uso
 *                          dateEnd:
 *                              type: string
 *                              formtat: date-time
 *                              description: fecha y hora final del uso            
 *      responses:
 *       '201':
 *         description: Nuevo uso creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: Mensaje de éxito
 *                  use:
 *                      $ref: '#/components/schemas/Uses'
 *                  user:
 *                      $ref: '#/components/schemas/User'
 *       '404':
 *         description: Usuario no encontrado     
 *      tags:
 *         - Uses Rutas para Users   
 *      
 *      
 *    
 */

/**
 * @swagger
 * /uses/{id_user}/{id}:
 *   get:
 *     summary: Obtener un uso de un usuario
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_user
 *         description: Id del usuario del que se quieren obtener los usos.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         description: Id del uso a obtener
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de todos los usos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  use:
 *                     $ref: '#/components/schemas/Uses'
 *       '404':
 *         description: Usuario o uso no encontrado
 * 
 *     tags:
 *         - Uses Rutas para Users
 *
 */

/**
 * @swagger
 * /uses/{id_user}/{id}:
 *   put:
 *     summary: Actualizar un uso
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_user
 *         description: Id del usuario del que se quieren actualizar el uso.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         description: Id del uso a obtener
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          dateInit:
 *                              type: string
 *                              format: date-time
 *                              description: Fecha y hora de inicio del uso
 *                              example: "2023-04-12T12:34:56.789Z"
 *                          dateEnd:
 *                              type: string
 *                              format: date-time
 *                              description: Fecha y hora de fin del uso
 *                              example: "2023-04-12T13:00:00.000Z"
 *     responses:
 *       '201':
 *         description: Uso actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  useUpdated:
 *                     $ref: '#/components/schemas/Uses'
 *                  message:
 *                      type: string
 *                      description: Usuario actualizado
 *       '404':
 *         description: Usuario o uso no encontrado
 * 
 *     tags:
 *         - Uses Rutas para Users
 *
 */


/**
 * @swagger
 * /uses/{id_user}/{id}:
 *   delete:
 *     summary: Borrar un uso de un usuario
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_user
 *         description: Id del usuario del que se quiere borrar el uso.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         description: Id del uso a borrar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Uso borrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: Uso borrado
 *                  user:
 *                     $ref: '#/components/schemas/User'
 *       '404':
 *         description: Usuario o uso no encontrado
 * 
 *     tags:
 *         - Uses Rutas para Users
 *
 */


router.post('/:id_user', verifyTokenUser,  usesCtrl.createUse)
router.get('/:id_user', verifyTokenUser , usesCtrl.getAllUses)
router.get('/:id_user/:id', verifyTokenUser, usesCtrl.getOneUse)
router.put('/:id_user/:id', verifyTokenUser, usesCtrl.updateUse)
router.delete('/:id_user/:id', verifyTokenUser, usesCtrl.deleteOneUse)



module.exports = router

