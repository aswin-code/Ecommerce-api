const router = require('express').Router();
const cartController = require('../controller/cartController')

router.route('/')
    .get(cartController.getACart)
    .post(cartController.AddRemoveCart)
module.exports = router