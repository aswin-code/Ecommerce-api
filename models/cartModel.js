const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    }]
})

const cartModel = mongoose.model('cart', cartSchema)
module.exports = cartModel