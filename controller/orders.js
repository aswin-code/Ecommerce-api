const orderModel = require('../models/order')
const cartModel = require('../models/cartModel')
const addressModel = require('../models/addressModel')
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userid: req.user }).populate({ path: 'products', populate: 'product' })
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
exports.createOrder = async (req, res) => {
    try {
        const { addressId, paymentType, products } = req.body
        if (!addressId || !paymentType) return res.status(400).json({ message: 'all fields required' })

        const cart = await cartModel.findOne({ userid: req.user })
        const orderProducts = cart.products.filter(product => cart.products.find(e => e.id == product._id))
        console.log(orderProducts)
        // const order = {
        //     products: orderProducts.products,
        //     totalPrice: orderProducts.totalPrice,
        // }
        // const { fullName,
        //     phone,
        //     pin,
        //     state,
        //     place,
        //     address,
        //     landMark } = await addressModel.findById(addressId)
        // let orderDate = new Date()
        // let deliveryDate = new Date()
        // deliveryDate.setDate(orderDate.getDate() + 3)
        // const totalItem = cart.products.reduce((crr, acc) => {
        //     return acc + crr.qty
        // }, 0)
        // if (paymentType === "COD") {
        //     const newOrder = new orderModel({
        //         userid: req.user,
        //         products: orderProducts.products,
        //         discountPrice: orderProducts.discountPrice,
        //         paymentType,
        //         orderStatus: "confirmed",
        //         fullName,
        //         phone,
        //         pin,
        //         state,
        //         place,
        //         address,
        //         landMark,
        //         orderDate: orderDate,
        //         deliveryDate,
        //         totalItem,
        //         totalPrice: orderProducts.totalPrice,
        //         totalDiscount: cart.totalDiscount
        //     })
        //     console.log(newOrder)
        //     await newOrder.save()
        //     return res.status(201).json({ message: 'order placed successfully' })

        // } else if (paymentType === "ONLINE_PAYMENT") {
        //     const newOrder = new orderModel({
        //         userid: req.user,
        //         products: cart.products,
        //         totalPrice: cart.totalPrice,
        //         discountPrice: cart.discountPrice,
        //         paymentType,
        //         paymentStatus: true,
        //         orderStatus: "confirmed",
        //         fullName,
        //         phone,
        //         pin,
        //         state,
        //         place,
        //         address,
        //         landMark,
        //         orderDate: orderDate,
        //         deliveryDate,
        //         totalItem,
        //         totalDiscount: cart.totalDiscount
        //     })
        //     console.log(newOrder)
        //     await newOrder.save()
        //     return res.status(201).json({ message: 'order placed successfully' })

        // }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
exports.getAOrders = async (req, res) => {
    try {
        const order = await orderModel.findById(req.param.orderId).populate({ path: 'products', populate: 'product' })
        res.status(200).json(order)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
exports.cancelOrder = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}