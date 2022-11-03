const express = require('express')
const router = express.Router()
const Order = require('../models/order')
//const authToken = require('../middleware/authToken')

//GET Request för orders
router.get('/', async (req, res) => {

    try {
        const orders = await Order.find()
        res.send(orders)
    } catch (error) {
        res.status(500).send({ msg: error.message })

    }
})



//POST Request för orders
router.post('/', async (req, res) => {
    
    if (!req.body.products || !Array.isArray(req.body.products) || !req.body.products.length) return res.status(400).send({ msg: "Missing required field products" }) 
    try {
            const orders = new Order({
                date: req.body.date,
                products: req.body.products || [],
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                adress: req.body.adress,
                postCode: req.body.postCode,
                postalDistrict: req.body.postalDistrict,
                country: req.body.country,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                orderType: req.body.orderType
            })
            // console.log(req.body.products)
            const newOrder = await orders.save()
            res.send({ sparade: newOrder })
        }
    catch (error) {
        
        res.status(500).send({ msg: req.body.products})
    }
})





module.exports = router