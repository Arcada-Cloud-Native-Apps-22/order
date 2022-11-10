const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const authToken = require('../middleware/authToken')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
//const jwt = require('jsonwebtoken')



//GET Request för orders
router.get('/', authToken, async (req, res) => {

    try {
        const orders = await Order.find()
        res.send(orders)
    } catch (error) {
        res.status(500).send({ msg: error.message })

    }
})


//POST Request för orders
router.post('/', authToken, async (req, res) => {

    // if (!req.body.products || !Array.isArray(req.body.products) || !req.body.products.length) return res.status(400).send({ msg: "Missing required field products" }) 
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
                orderType: req.body.orderType,
                payment: req.body.payment
            })
            // console.log(req.body.products)
            const newOrder = await orders.save()
    
            const datan = await fetch("https://wgyffa47l5.execute-api.us-east-1.amazonaws.com/dev/createpdf", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': ''
                },
                body: JSON.stringify({
                    "orderID": newOrder.id,
                    "name": newOrder.firstName + " " + newOrder.lastName,
                    "address": newOrder.adress,
                    "postcode": newOrder.postCode,
                    "city": newOrder.postalDistrict,
                    "country": newOrder.country  
                })

            })
            const data = await datan.json()

            res.send({invoice: newOrder})
        } 
    catch (error) {
        
        res.status(500).send({ msg: req.body.products})
    }
   
})




    // request({
    //     url: 'https://@shipping/invoice',
    //     method: 'POST',
    //     headers: {'Content-type': 'application/json; charset=UTF-8'}, 
    //     body:  JSON.stringify({
    //         "orderID": ,
    //         "name": req.body.firstName + " " + req.body.lastName,
    //         "address": req.body.adress,
    //         "postcode": req.body.postCode,
    //         "city": req.body.postalDistrict,
    //         "country": req.body.country
    //     })
    //     .then(res => res.json())
    //     .then(console.log)
    // })
    // if (!req.body.products || !Array.isArray(req.body.products) || !req.body.products.length) return res.status(400).send({ msg: "Missing required field products" })

    






module.exports = router