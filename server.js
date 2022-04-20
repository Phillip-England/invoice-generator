const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const cookieParser = require('cookie-parser') //enabling us to use cookies for jwt tokens
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorMiddleware')

connectDB()

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views/pages')) //setting up where to look for our views
app.use(cookieParser('secret')) //setting up and giving our cookie parser a secret
app.use('/public', express.static(path.join(__dirname, 'public'))) //setting location for our static files
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/user', require('./routes/userRoutes')) //all our user routes found here
app.use('/category', require('./routes/categoryRoutes')) //all our category routes found here
app.use('/invoice', require('./routes/invoiceRoutes')) //all our invoice routes
app.use('/expense', require('./routes/expenseRoutes')) //all our expense routes



app.use(errorHandler) //bringing in our default error handler

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})