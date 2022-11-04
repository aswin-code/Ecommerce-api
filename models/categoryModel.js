const mongoose = requie('mongoose')
const categorySchema = mongoose.Schema({
    name: String,
    image: String,
})