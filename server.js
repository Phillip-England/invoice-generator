const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorMiddleware')

connectDB()

const app = express()
app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/user', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})