/*MODULES*/
const User = require('../models/User')
const createToken = require('./createToken')
const sendEmail = require('./sendEmail')

const createAdmin = async (config) => {
    try{
        const admin = await User.findOne({email:config.EMAIL_ADMIN})
       
        if(!admin){
            console.log('Not exist a admin')
            const newAdmin = new User({
                name:config.NAME_ADMIN,
                password: config.PASSWORD_ADMIN,
                email: config.EMAIL_ADMIN,
                role: 'admin',
                verified:'Not verified'
            })

            newAdmin.password = await newAdmin.encryptPassword(newAdmin.password)
            const AdminSaved = await newAdmin.save()
            console.log('Admin created')
            
            const token = createToken(AdminSaved._id, config.EMAIL_ADMIN)

            await sendEmail(config.EMAIL_ADMIN , token)

        }
        if(admin){
            console.log('Exist a admin yet')
        }

    }catch(error){
        console.log(error)
    }
}

module.exports = createAdmin