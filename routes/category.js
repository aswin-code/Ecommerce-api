const express = require('express')
const router = express.Router()
const productRoute = express.Router({ mergeParams: true })
const categoryController = require('../controller/categoryController')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/category");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
})
const upload = multer({ storage })
router.use('/:categoryid/products', productRoute)
router.route('/')
    .get(categoryController.getAllCategory)
    .post(upload.single('category'), categoryController.createCategory)

productRoute.route('/').get(categoryController.getAllProduct)
module.exports = router