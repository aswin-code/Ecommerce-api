const mongoose = require('mongoose')
const carousalSchema = mongoose.Schema({
    image: [String]
});

const carousalModel = mongoose.model('carousal', carousalSchema);
module.exports = carousalModel