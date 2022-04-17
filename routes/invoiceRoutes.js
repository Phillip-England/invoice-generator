const express = require('express')
const router = express.Router()
const authUser = require('../middleware/authUser')
const csurf = require('csurf')
const csrfProtection = csurf({cookie: {httpOnly: true}})
const {
    addCategory,
    categoryPage,
} = require('../controllers/invoiceController')

router.get('/categories', csrfProtection, authUser, categoryPage)
router.post('/addCategory', csrfProtection, authUser, addCategory)

module.exports = router