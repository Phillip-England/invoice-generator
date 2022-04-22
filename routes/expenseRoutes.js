const express = require('express')
const router = express.Router()
const authUser = require('../middleware/authUser')
const csurf = require('csurf')
const csrfProtection = csurf({cookie: {httpOnly: true}})
const {
    addExpense,
    updateExpense,
    deleteExpense,
    completeExpense,
} = require('../controllers/expenseController')

router.post('/addExpense/:user/:invoice', addExpense) //adds a new expense to an invoice

router.post('/updateExpense/:invoice/:expense', updateExpense) //updates an expense

router.delete('/deleteExpense/:expense', deleteExpense) //deletes an expense

router.put('/completeExpense/:expense', completeExpense) //deletes an expense




module.exports = router