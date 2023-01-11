/*MODULES*/
const mongoose =require('mongoose')
const config = require('./config')

/*DB CONNECTION*/
mongoose.connect( `mongodb://${config.MONGO_INITDB_ROOT_USERNAME}:${config.MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/miapp?authSource=admin`)

/*DB EVENTS*/
mongoose.connection.on('connected',()=>{
    console.log("DB connected")
})

mongoose.connection.on('error',(error)=>{
    console.log(error)
})