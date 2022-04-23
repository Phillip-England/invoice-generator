const Expense = require('../models/expenseModel')
const Invoice = require('../models/invoiceModel')

const addExpense = async (req, res, next) => {
    try {
        //grabbing data from the client form
        const {
            expense_category,
            expense_date,
            expense_place,
            expense_description,
            expense_price,
        } = req.body
        //checking if all the form fields were filled out
        if (!expense_category || !expense_date || !expense_place || !expense_description || !expense_price){
            throw new Error('Please fill out all of the form fields')
        }
        //getting the invoice the expense is associated with
        //the invoice id is passed along in the url in this case
        const invoice = await Invoice.findById(req.params.invoice)
        //creating the new expense
        const expense = await Expense.create({
            user: req.params.user,
            invoice: invoice,
            category: expense_category,
            date: expense_date,
            place: expense_place,
            description: expense_description,
            price: expense_price,
        })
        //checking if the expense was created
        if (!expense) {
            throw new Error('Failed to create expense')
        }
        //ending the request and reloading the current page
        res.status(200)
        res.redirect(('/invoice/' + req.params.invoice))
    } catch (error) {
        next(error)
    }
}

const updateExpense = async (req, res, next) => {
    try {
         //grabbing data from the client form
         const {
            expense_category,
            expense_date,
            expense_place,
            expense_description,
            expense_price
        } = req.body
        //checking if all the form fields were filled out
        if (!expense_category || !expense_date || !expense_place || !expense_description || !expense_price){
            throw new Error('Please fill out all of the form fields')
        }
        //getting the invoice the expense is associated with
        //the invoice id is passed along in the url in this case
        const invoice = await Invoice.findById(req.params.invoice)
        //updating the expense
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.expense, {
            invoice: invoice,
            category: expense_category,
            date: expense_date,
            place: expense_place,
            description: expense_description,
            price: expense_price,
        })
        //checking if the expense was updated
        if (!updatedExpense) {
            throw new Error('Failed to updated expense')
        }
        //ending the request and reloading the current page
        res.status(200)
        res.redirect(('/invoice/' + req.params.invoice))
    } catch (error) {
        next(error)
    }
}

const deleteExpense = async (req, res, next) => {
    try {
        //grabbing our expense
        const deletedExpense = await Expense.findByIdAndDelete(req.params.expense)
        //checking if we got our deleted expense
        if(!deletedExpense){
            throw new Error('Failed to deleted expense')
        }
        res.status(200).json({
            deletedExpense
        })
    } catch (error) {
        next(error)
    }
}

const completeExpense = async (req, res, next) => {
    try {
        //getting our expense
        const expense = await Expense.findById(req.params.expense)
        //if we failed to get the expense, throw an error
        if(!expense){
            throw new Error('Failed to get expense')
        }
        //if the expense.completed is false, make it true, else, make it false
        if(expense.completed == true){
            //changing the expense.completed to false
            const uncompletedExpense = await Expense.findByIdAndUpdate(req.params.expense, {
                completed: false
            })
            //checking if we have the uncompletedExpense
            if(!uncompletedExpense){
                throw new Error('Failed to update expense')
            }
        } else {
            //changing the expense.completed to true
            const completedExpense = await Expense.findByIdAndUpdate(req.params.expense, {
                completed: true
            })
            //checking if we have our completedExpense
            if(!completedExpense){
                throw new Error('Failed to update expense')
            }
        }
        res.status(200)
        res.end()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addExpense,
    updateExpense,
    deleteExpense,
    completeExpense,
}