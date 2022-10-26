const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var morgan = require('morgan')
require('dotenv').config()
const cors = require('cors');
const app = express()
app.use(morgan('tiny'));
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

const port = process.env.PORT || 5000;
const connectionString = process.env.DB_CONNECTION_STRING



app.use(cors())
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
// app.use('/api/v1/products')

mongoose.connect(connectionString).then(() => {
    app.listen(port, () => {
        console.log("server running on port : " + port)
    })
}).catch((err) => {
    console.log(err.message)
})