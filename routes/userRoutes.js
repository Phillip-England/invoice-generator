const express = require('express')
const router = express.Router()
const authUser = require('../middleware/authUser')
const {
    loginPage,
    loginUser,
    logoutUser,
    registerPage,
    registerUser,
    homePage,
} = require('../controllers/userController')


router.get('/login', loginPage)
router.post('/login', loginUser)

router.get('/logout', logoutUser)

router.get('/register', registerPage)
router.post('/register', registerUser)

router.get('/home', authUser, homePage)

module.exports = router