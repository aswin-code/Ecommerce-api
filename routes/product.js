const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/products");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
})
const upload = multer({ storage })

router.route('/')
    .get(productController.getAllProducts)
    .post(upload.array('images', 3), productController.createProducts)
// router.route('/:id')
//     .get(userController.getAuser)
//     .patch(userController.updateUser)
module.exports = router