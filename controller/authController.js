const userModel = require('../models/userModel');
const twilio = require('../utils/twilio')
const bcrypt = require('bcrypt')


exports.signup = async (req, res) => {
    const { email, password, phone, fullname } = req.body
    try {
        const olduser = await userModel.findOne({ email })
        if (olduser) return res.json({ message: "user already exist" })
        const newUser = new userModel({ email, password, phone, fullname })
        await newUser.save();
        twilio.sendOtp(phone)
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email })
        if (!user) return res.status(400).json({ message: "invaild username or password" })
        const result = await bcrypt.compare(password, user.password)
        if (!result) return res.status(400).json({ message: "invaild username or password" })
        if (!user.verified) return res.status(401).json({ phone: user.phone, message: "please verify your phone number" })
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}

exports.verifyotp = async (req, res) => {
    try {
        const { otp, email } = req.body
        const { phone } = await userModel.findOne({ email })
        const data = await twilio.verifyOtp(phone, otp)
        if (data?.valid) {
            await userModel.findOneAndUpdate({ email }, { $set: { verified: true } })
            res.status(200).json({ status: 'ok', message: "otp verified successfully", verified: true })

        } else {
            res.status(400).json({ status: 'failed', message: "invaild otp ", verified: false })
        }
    } catch (error) {
        console.log(error)
    }
}


exports.sendOtp = async (req, res) => {
    try {
        const { phone } = req.body;
        const data = await twilio.sendOtp(phone)
        res.status(200).json({ message: "otp send successfully" })
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }
}