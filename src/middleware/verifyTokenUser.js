/*MODULES*/
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config')


const verifyTokenUser = async (req, res, next) => {
    try {
        const authorization = req.get('Authorization')
        let token = ""
        if (authorization && authorization.toLowerCase().startsWith("bearer")) {
            token = authorization.substring(7)
        }
         jwt.verify(token, config.KEY, async (err, decodedToken) => {
            if (err) {
                res.status(401)
                const error = new Error(err.name)
                return next(error)
            }
            
            const user = await User.findOne({ email: decodedToken.email })
            
            if (!user) {
                res.status(401)
                const error = new Error("Permiso denegado")
                return next(error)
            }

            if(user.verified === 'Not verified'){
                res.status(401)
                const error = new Error("Verifique su cuenta de correo")
                return next(error)
            }
    
            console.log("Token valido")
            req.email = decodedToken.email
            req.id = decodedToken.id
            next()
        })

      
    } catch (error) {
        console.log(error)
        res.status(401)
        return next(error)
    }

}

module.exports = verifyTokenUser