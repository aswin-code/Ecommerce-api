const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    Price: String,
    discountPrice: String,
    offer: String,
    size: [String],
    image: [String]
})