const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')


router.route('/')
    .get(productController.getAllProducts)
    .post(productController.createProducts)
// router.route('/:id')
//     .get(userController.getAuser)
//     .patch(userController.updateUser)
module.exports = router