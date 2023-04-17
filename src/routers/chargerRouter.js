/*MODULES*/
const {Router} = require('express')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')


/*CONTROLLERS*/
const chargerCtrl = require('../controllers/chargerController')


const router = Router()

/*Rutas accesibles solo por el admin*/

/**
 * @swagger
 *  /charger/all:
 *      get:
 *          summary: Obtener todos los cargadores
 *          security:
 *            - bearerAuth: []
 *          responses:
 *              '200':
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties: 
 *                                  chargers:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/Charger'
 *      
 *          tags:
 *            - Charger Rutas Admin
 */

/**
 * @swagger
 *  /charger:
 *      post:
 *          summary: Crear un nuevo cargador
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *          responses:
 *              '201':
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties: 
 *                                  charger:
 *                                       $ref: '#/components/schemas/Charger'
 *                                  message:
 *                                      type: string
 *                                      description: Nuevo cargador creado
 *      
 *          tags:
 *            - Charger Rutas Admin
 */

/**
 * @swagger
 *  /charger/{id}:
 *      delete:
 *          summary: Crear un nuevo cargador
 *          security:
 *            - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                description: id del cargador a borrar
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *            '201':
 *              description: Borrar cargador
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                     message:
 *                       type: string
 *                       description: "Cargador borrado"
 *      
 *          tags:
 *            - Charger Rutas Admin
 */

/**
 * @swagger
 *  /charger/{id}:
 *      get:
 *          summary: Obtener cargador por id
 *          security:
 *            - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                description: id del cargador a obtener
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *            '200':
 *              description: Cargador obtenido con éxito
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      charger:
 *                        $ref: '#/components/schemas/Charger'  
 *      
 *          tags:
 *            - Charger Rutas Admin
 */

router.get('/all', verifyTokenAdmin,  chargerCtrl.getAll)
router.post('/', verifyTokenAdmin,  chargerCtrl.create)
router.delete('/:id',verifyTokenAdmin, chargerCtrl.delete)
router.get('/:id',verifyTokenAdmin, chargerCtrl.get)


module.exports = router