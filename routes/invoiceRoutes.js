const express = require('express')
const router = express.Router()
const authUser = require('../middleware/authUser')
const csurf = require('csurf')
const csrfProtection = csurf({cookie: {httpOnly: true}})
const {
    addCategory,
    categoryPage,
    deleteCategory
} = require('../controllers/invoiceController')

router.get('/categories', csrfProtection, authUser, categoryPage)
router.post('/categories/addCategory', csrfProtection, authUser, addCategory)
router.delete('/categories/deleteCategory/:id', authUser, deleteCategory)

module.exports = router