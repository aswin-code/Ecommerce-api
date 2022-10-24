const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')


router.route('/:id')
    .get(userController.getAUser)
    .patch(userController.updateUser)
router.route('/:id/changePassword')
module.exports = router