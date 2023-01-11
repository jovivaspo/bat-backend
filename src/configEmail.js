const nodemailer = require("nodemailer")
const config = require("./config")

const user = {
    email: config.SEND_EMAIL,
    pass: config.SEND_PASS
}

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    tls:{
        rejectUnauthorized:false
    },
    secure: true, // true for 465, false for other ports
    auth: {
        user: user.email,
        pass: user.pass
    },
})

module.exports = transporter