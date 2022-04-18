const express = require('express')
const router = express.Router()
const authUser = require('../middleware/authUser')
const csurf = require('csurf')
const csrfProtection = csurf({cookie: {httpOnly: true}})
const {
    invoicePage,
} = require('../controllers/invoiceController')

router.get('/', csrfProtection, authUser, invoicePage)

module.exports = router