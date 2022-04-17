const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//getting the login page
const loginPage = (req, res) => {
    res.render('login.ejs')
}

//getting the registration page
const registerPage = (req, res) => {
    res.render('register.ejs')
}

//getting the homepage if user is logged in
//if not, sending them back to login page
const homePage = (req, res) => {
    if (req.user) {
        res.render('home.ejs', {user: req.user})
    } else {
        res.render('login.ejs')
    }
}

//creating a new user for our site
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

//logging a user in and creating a jwt cookie
const loginUser = async (req, res, next) => {
    try {
        const {username, password} = req.body
        //grabbing user associated with our username
        const user = await User.findOne({username:username}) 
        //check if username and password come from the same user
        if (user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
            //creating a cookie with our token in it
            res.cookie('token', token, {
                maxAge: 1000*60*15,
                httpOnly: true,
                signed: true
            })
            res.redirect('/user/home')
        } else {
            res.status(400)
            throw new Error('Invalid credentials')
        }
    } catch (error) {
        next(error)
    }
}

//logging a user out by deleting our jwt cookie
const logoutUser = (req, res) => {
    res.clearCookie('token')
    res.redirect('/user/login')
}


module.exports = {
    loginPage,
    registerPage,
    registerUser,
    loginUser,
    logoutUser,
    homePage
}