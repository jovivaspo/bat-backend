/*MDULES*/
const express = require('express')
const config = require('./config')
const cors = require('cors')
const helmet = require('helmet')
const createAdmin = require('./services/createAdmin')
const notFound = require('./middleware/notFound')
const handlerError = require('./middleware/handlerError')
require('./database')


/*CREATE APP*/
const app = express()

/*VERIFY OR CREATE ADMIN*/
createAdmin(config)

/*SET CONFIG APP*/
app.set('port', config.PORT || 8000)

/*MIDDLEWARE*/
app.use(cors())
app.use(helmet())
app.use(express.json())

/*ROUTES*/
app.use('/user', require('./routers/userRouter'))
app.use('/uses', require('./routers/usesRouter'))
app.use('/charger', require('./routers/chargerRouter'))

/*HANDLER ERRORS*/
app.use(notFound)
app.use(handlerError)

module.exports = app

