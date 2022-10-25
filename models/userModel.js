const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    phone: Number,
    verified: {
        type: Boolean,
        default: false
    }
})
userSchema.pre('save', async function (next) {
    try {
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        next();
    } catch (error) {
        console.log(error)
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel