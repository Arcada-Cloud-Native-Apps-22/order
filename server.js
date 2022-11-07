const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3080


require('dotenv').config()

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.on('open', () => console.log('Connected to DB!'))

console.log(process.env.PASS)
app.use(express.json())
app.use(require('./middleware/cors'));

const runAlways = (req, res, next) => {
    res.locals.myVariable = ' Hello from runAlways'
    console.log(`A request was made to ${req.path}`)
    if (req.path == '/') {

        console.log(`This is the site root`)
    }
    next()
}

const orderRouter = require('./routes/orders')
app.use('/orders', orderRouter)



app.use(runAlways)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))