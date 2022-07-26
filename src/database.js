/*MODULES*/
const mongoose =require('mongoose')
const config = require('./config')

/*DB CONNECTION*/
mongoose.connect(config.URI_MONGO)

/*DB EVENTS*/
mongoose.connection.on('connected',()=>{
    console.log("DB connected")
})

mongoose.connection.on('error',(error)=>{
    console.log(error)
})