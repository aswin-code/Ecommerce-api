const productModel = require('../models/productModel')

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find(req.query)
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
    }
}
exports.createProducts = async (req, res) => {
    try {
        const { name, price, discountPrice, offer, size, category, rating } = req.body
        const image = req.files.map(e => e.filename)
        const newProduct = new productModel({ name, price, discountPrice, offer, size, category, rating, image })
        await newProduct.save()
        res.status(201).json({ message: 'product added successfully' })
    } catch (error) {
        console.log(error)

    }
}
exports.getAProducts = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {

    }
}