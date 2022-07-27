/*MODULES*/
const {Router} = require('express')

/*CONTROLLERS*/
const userCtrl  = require('../controllers/userController')
const usesCtrl = require('../controllers/usesController')

const router = Router()

/*USERS*/
router.get('/', userCtrl.getAllUsers)
router.get('/:id', userCtrl.getOneUser)
router.post('/register', userCtrl.createUser)
router.post('/login', userCtrl.loginUser)
router.delete('/delete/users', userCtrl.deleteAllUser)
router.delete('/delete/:id', userCtrl.deleteUser)
router.put('/update/:id', userCtrl.updateUser)

/*USES*/
router.get('/:id/uses', usesCtrl.getAllUses)
/*
router.get('/:id/uses/:id_use', usesCtrl.getOnUse)
router.post('/:id/uses/create', usesCtrl.createUse)
router.put('/:id/uses/:id_use/update', usesCtrl.updateUse)
router.delete('/:id/uses/:id_use/delete', usesCtrl.deleteUse)*/





module.exports = router