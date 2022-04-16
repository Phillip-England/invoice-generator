const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jtw = require('jsonwebtoken')
const res = require('express/lib/response')


const loginPage = (req, res) => {
    res.render('login.ejs')
}

const registerPage = (req, res) => {
    res.render('register.ejs')
}

const registerUser = async (req, res, next) => {
    try {
        //grabbing content from the request body
        const {username, email, password} = req.body
        //checking if user filled out all fields
        if(!username || !email || !password){
            res.status(400)
            throw new Error('Please fill out all the form fields')
        }
        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        //checking if the user exists already
        const userExists = await User.findOne({username:username})
        if(userExists){
            res.status(400)
            throw new Error('Username already taken')
        }
        //creating our new user
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })
        console.log(user)
        //checking if user was actually created
        if(user){
            res.status(200)
            res.redirect('/user/login')
        } else {
            res.status(400)
            throw new Error('Failed to create user')
        }
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const {username, password} = req.body
        //grabbing user associated with our username
        const user = await User.findOne({username:username}) 
        //check if username and password come from the same user
        if (user && (await bcrypt.compare(password, user.password))){
            console.log(user)
            res.status(200).json({
                _id: user._id,
                name: user.username,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid credentials')
        }
    } catch (error) {
        next(error)
    }
}

//get JWT token
const generateToken = (id) => {
    return jtw.sign({id}, 'secret', {
        expiresIn: '30d'
    })
}

module.exports = {
    loginPage,
    registerPage,
    registerUser,
    loginUser
}