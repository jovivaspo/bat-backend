/*MODULES*/
const dotenv = require('dotenv')
const path = require('path')

const uri = `../${process.env.NODE_ENV}.env`.replace(" ","")

dotenv.config({
    path:path.resolve(__dirname, uri)

})

module.exports = {
    NODE_ENV : process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_INITDB_ROOT_USERNAME:process.env.MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD:process.env.MONGO_INITDB_ROOT_PASSWORD,
    NAME_ADMIN: process.env.NAME_ADMIN,
    PASSWORD_ADMIN: process.env.PASSWORD_ADMIN,
    EMAIL_ADMIN: process.env.EMAIL_ADMIN,
    KEY: process.env.KEY,
    SEND_EMAIL: process.env.SEND_EMAIL,
    SEND_PASS: process.env.SEND_PASS,
    LOCAL_URL_DOC: process.env.LOCAL_URL_DOC

}