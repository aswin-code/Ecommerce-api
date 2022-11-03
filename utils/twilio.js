const dotenv = require('dotenv')
dotenv.config()
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const ServiceSID = process.env.SERVICEID;
const client = require('twilio')(accountSid, authToken, ServiceSID);
const nodemailer = require("nodemailer");

// exports.sendOtp = async (phone) => {
//     try {
//         const data = await client.verify.v2.services(ServiceSID).verifications.create({
//             to: `+91${phone}`,
//             channel: 'sms'
//         })
//         return data
//     } catch (error) {
//         return error
//     }

// }
// exports.verifyOtp = async (phone, otp) => {
//     try {
//         const data = await client.verify.v2.services(ServiceSID).verificationChecks.create({
//             to: `+91${phone}`,
//             code: otp
//         })
//         return data
//     } catch (error) {
//         console.log(error)
//     }
// }

exports.sendOtp = async (email, otp) => {
    try {
        let transporter = nodemailer.createTransport({

            service: 'Gmail',
            auth: {
                user: 'aswinmeet1@gmail.com',
                pass: 'fkqjppxeemuqfndj',
            },
        })

        transporter.sendMail({
            from: "hello@gmail.com",
            to: email,
            subject: 'verify your account',
            text: 'verify your account ',
            html: `<p>verify your account with this otp :<b>${otp}</b></p>`
        }, (err, info) => {
            if (err) {
                console.log(err)
            } else {
                console.log(info)
            }
        })


    } catch (error) {
        console.log(error)
    }
}
