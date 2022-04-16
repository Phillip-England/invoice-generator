const express = require('express')
const router = express.Router()
const {
    loginPage,
    loginUser,
    registerPage,
    registerUser,
} = require('../controllers/userController')


router.get('/login', loginPage)
router.post('/login', loginUser)

router.get('/register', registerPage)
router.post('/register', registerUser)

module.exports = router