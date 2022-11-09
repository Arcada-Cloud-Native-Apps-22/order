const mongoose = require('mongoose')

const productsList = new mongoose.Schema({
  product_id: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  // ORDER INFORMATION
  date: {
    type: Date,
    required: true
  },

  // BASKET INFORMATION
  products: [productsList],

  // CUSTOMER
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  postCode: {
    type: String,
    required: true
  },
  postalDistrict: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  
  // ORDER FORMAT
  orderType: {
    type: String,
    required: true
  },

  // Order payment method 
  payment: {
    type: String,
    required: true
  }

}, {
  timestamps: true
})



module.exports = mongoose.model('order', orderSchema)