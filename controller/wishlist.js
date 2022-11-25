const wishlistModel = require('../models/wishListModel')

exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await wishlistModel.findOne({ userId: req.user })
        res.status(200).json(wishlist)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

exports.AddAndRemoveWishlist = async (req, res) => {
    try {
        if (req?.body?.product) return res.status(400).json({ message: 'all fields required' })
        const found = await wishlistModel.findOne({ userId: req.body.userId })
        if (!found) {
            const newWishlist = new wishlistModel({ userId: req.user, products: req.body.product })
            await newWishlist.save()
            return res.status(201).json({ message: 'product added to wishlist' })
        }
        if (!found.products.find(e => e == req.body.product)) {
            found.products = [...found.products, req.body.product]
            await found.save()
            return res.status(201).json({ message: 'product added to wishlist' })
        }
        found.products.filter(e => e !== req.body.product)
        return res.status(204).json({ message: 'product remove to wishlist' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}