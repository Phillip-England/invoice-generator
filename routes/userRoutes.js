const express = require('express')
const router = express.Router()
const authUser = require('../middleware/authUser')
const csurf = require('csurf')
const csrfProtection = csurf({cookie: {httpOnly: true}})
const {
    loginPage,
    loginUser,
    logoutUser,
    registerPage,
    registerUser,
    homePage,
} = require('../controllers/userController')


router.get('/login', loginPage).post('/login', loginUser) //getting login page and login functionality

router.get('/logout', logoutUser) //logout functionality

router.get('/register', registerPage).post('/register', registerUser) //getting register page and creating a user

router.get('/home', csrfProtection, authUser, homePage) //going to home page if user is validated via JWT cookie

module.exports = router