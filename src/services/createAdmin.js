/*MODULES*/
const User = require('../models/User')

const createAdmin = async (config) => {
    try{
        const admin = await User.findOne({email:config.EMAIL_ADMIN})
       
        if(!admin){
            console.log('Not exist a admin')
            const newAdmin = new User({
                name:config.NAME_ADMIN,
                password: config.PASSWORD_ADMIN,
                email: config.EMAIL_ADMIN,
                role: 'admin'
            })

            newAdmin.password = await newAdmin.encryptPassword(newAdmin.password)
            await newAdmin.save()
            console.log('Admin created')

        }
        if(admin){
            console.log('Exist a admin yet')
        }

    }catch(error){
        console.log(error)
    }
}

module.exports = createAdmin