const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/refresh', authController.refresh)

router.route('/otp')
    .get(authController.sendOtp)
    .post(authController.verifyotp)
router.route('/google').post(authController.googleLogin)
router.route('/password')
    .post(authController.forgotPassword)
module.exports = router 