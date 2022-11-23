const mongoose = require('mongoose')

const wishlistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products: [mongoose.Schema.Types.ObjectId]
})

const wishlistModel = mongoose.model('wishlist', wishlistSchema)

module.exports = wishlistModel