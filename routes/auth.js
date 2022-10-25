const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.route('/otp')
    .get(authController.sendOtp)
    .post(authController.verifyotp)
router.post('/forgotPassword',)
module.exports = router 