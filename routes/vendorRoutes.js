const express = require('express')
const router = express.Router()
const authUser = require('../middleware/authUser')
const csurf = require('csurf')
const csrfProtection = csurf({cookie: {httpOnly: true}})
const {
    vendorPage,
    addVendor,
    deleteVendor,
} = require('../controllers/vendorController')

router.get('/', csrfProtection, authUser, vendorPage) //gets vendor.ejs
router.post('/addVendor', csrfProtection, authUser, addVendor) //adds a new vendor to our listing
router.delete('/deleteVendor/:vendor', authUser, deleteVendor) //deletes a given vendor

module.exports = router