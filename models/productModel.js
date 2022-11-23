const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    price: String,
    discountPrice: String,
    offer: String,
    size: [String],
    image: [String],
    category: {
        type: mongoose
            .Schema.Types.ObjectId,
        ref: 'category'
    },
    rating: String
})

const productModel = mongoose.model('products', productSchema)

module.exports = productModel