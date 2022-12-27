const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    discountPrice: Number,
    offer: Number,
    size: [String],
    image: [String],
    category: {
        type: mongoose
            .Schema.Types.ObjectId,
        ref: 'category'
    },
    rating: String,
    deliveryFee: String,
    description: String,
    details: {
        ram: String,
        processor: String,
        frontCam: String,
        rearCam: String,
        display: String,
        battery: String
    }
})

const productModel = mongoose.model('products', productSchema)

module.exports = productModel