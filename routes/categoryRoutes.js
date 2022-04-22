const express = require('express')
const router = express.Router()
const authUser = require('../middleware/authUser')
const csurf = require('csurf')
const csrfProtection = csurf({cookie: {httpOnly: true}})
const {
    addCategory,
    categoryPage,
    deleteCategory
} = require('../controllers/categoryController')

router.get('/', csrfProtection, authUser, categoryPage)
router.post('/addCategory', csrfProtection, authUser, addCategory)
router.delete('/deleteCategory/:user/:category', authUser, deleteCategory)

module.exports = router