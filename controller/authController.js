const userModel = require('../models/userModel');
const twilio = require('../utils/twilio')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const otpModel = require('../models/otp')


exports.signup = async (req, res) => {
    const { email, password, phone, fullname } = req.body
    try {
        const olduser = await userModel.findOne({ email })
        if (olduser) return resStatus(400).json({ message: "user already exist" })
        const newUser = new userModel({ email, password, phone, fullname })
        await newUser.save();
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email })
        if (!user) return res.status(401).json({ message: "invaild username or password" })
        const result = await bcrypt.compare(password, user.password)
        if (!result) return res.status(401).json({ message: "invaild username or password" })
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}

exports.verifyotp = async (req, res) => {
    try {
        const { otp, email } = req.body
        const found = await otpModel.findOne({ userid: email })
        if (!found) return res.status(401).json({ message: 'something went wrong' })
        if (found.otp !== otp) return res.status(401).json({ message: 'invalid otp' });
        await otpModel.findOneAndDelete({ userid: email })
        res.status(200).json({ status: 'ok', message: "otp verified successfully", verified: true })
    } catch (error) {
        console.log(error)
    }
}


exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.query;
        const otp = Math.floor(1000 + Math.random() * 9000)
        const otpM = new otpModel({ userid: email, otp })
        await otpM.save()
        const data = await twilio.sendOtp(email, otp)
        console.log(data)
        res.status(200).json({ message: "otp send successfully" })
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }
}
exports.forgotPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email })
        user.password = password
        await user.save()
        res.status(202).json({ message: "password updated" })
    } catch (error) {

    }
}

exports.googleLogin = async (req, res) => {
    try {
        const { email, name } = req.body
        if (!email || !name) return res.status(401)
        const user = new userModel({ email, fullname: name })
        await user.save()
        res.status(201).json({ message: "user create" })
    } catch (error) {
        console.log(error)
    }
}