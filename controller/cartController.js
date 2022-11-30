const cartModel = require('../models/cartModel')

exports.getACart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ userid: req.user }).populate({ path: 'products', populate: 'product' })
        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'someting went wrong' })
    }
}
exports.AddRemoveCart = async (req, res) => {
    try {
        const { product } = req.body?.product
        if (!product) return res.status(400).json({ message: 'all fields require' })
        const found = await cartModel.findOne({ userid: req.user })
        if (!found) {
            const newCart = new cartModel({ userid: req.user, proudcts: [{ product }] })
            await newCart.save()
            return res.status(201).json({ message: 'product added to cart successfully' })
        }
        if (!found.products.find(e => e.product == product)) {
            await cartModel.findByIdAndUpdate(found._id, { $push: { products: { product } } })
            return res.status(201).json({ message: 'product added to cart successfully' })
        }
        await cartModel.findByIdAndUpdate(found._id, { $pull: { products: { product } } })
        return res.status(201).json({ message: 'product removed from cart successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'someting went wrong' })
    }
}