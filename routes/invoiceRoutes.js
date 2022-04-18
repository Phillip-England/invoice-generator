const express = require('express')
const router = express.Router()
const authUser = require('../middleware/authUser')
const csurf = require('csurf')
const csrfProtection = csurf({cookie: {httpOnly: true}})
const {
    invoicePage,
    addInvoice,
} = require('../controllers/invoiceController')

router.get('/', csrfProtection, authUser, invoicePage)

router.post('/addInvoice', csrfProtection, authUser, addInvoice)

module.exports = router