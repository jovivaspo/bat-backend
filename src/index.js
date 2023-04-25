/*MODULES*/
const app = require('./app')
const config = require('./config')


app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}, documentation: ${config.LOCAL_URL_DOC}`)
})
