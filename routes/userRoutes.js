const express = require('express')
const router = express.Router()
const authUser = require('../middleware/authUser')
const {
    loginPage,
    loginUser,
    registerPage,
    registerUser,
} = require('../controllers/userController')


router.get('/login', loginPage)
router.post('/login', authUser, loginUser)

router.get('/register', registerPage)
router.post('/register', registerUser)

module.exports = router