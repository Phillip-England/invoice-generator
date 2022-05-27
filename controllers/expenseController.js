const Expense = require('../models/expenseModel')
const Invoice = require('../models/invoiceModel')


const addExpense = async (req, res, next) => {
    try {
        //grabbing data from the client form
        const {
            expense_date,
            expense_category,
            expense_vendor,
            expense_description,
            expense_cost,
        } = req.body
        //checking if all the form fields were filled out
        if (!expense_date || !expense_category || !expense_vendor || !expense_description || !expense_cost){
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
            vendor: expense_vendor,
            description: expense_description,
            cost: expense_cost,
        })
        //checking if the expense was created
        if (!expense) {
            throw new Error('Failed to create expense')
        }
        //returning the new expense to the client
        res.status(200).json({
            expense: expense
        })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}

const updateExpense = async (req, res, next) => {
    try {
         //grabbing data from the client form
         const {
            expense_category,
            expense_date,
            expense_vendor,
            expense_description,
            expense_cost,
            expense_invoice
        } = req.body

        //checking if all the form fields were filled out
        if (!expense_category || !expense_date || !expense_vendor || !expense_description || !expense_cost || !expense_invoice){
            throw new Error('Please fill out all of the form fields')
        }

        //getting the invoice the expense is associated with based off the passed in name
        const newInvoice = await Invoice.findOne({name:expense_invoice})
        
        //updating the expense
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.expense, {
            invoice: newInvoice,
            category: expense_category,
            date: expense_date,
            vendor: expense_vendor,
            description: expense_description,
            cost: expense_cost,
        })

        //getting all the expenses associated with the invoice
        const invoiceExpenses = await Expense.find({invoice:updatedExpense.invoice, completed:true})

        //running a loop to get the cost of the expenses
        let cost = 0
        for (x = 0; x < invoiceExpenses.length; x++){
            cost = cost + invoiceExpenses[x].cost
        }

        //updating the cost of the invoice the expense is associated with
        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.invoice, {
            cost: Math.round(100*cost)/100
        })

        //checking if the expense was transferred to another invoice
        if (newInvoice._id != updatedInvoice._id) {
            //getting all the expenses associated with the new invoice
            const newInvoiceExpenses = await Expense.find({invoice:newInvoice._id, completed:true})
            //running a loop to get the cost of the expenses
            let cost = 0
            for (x = 0; x < newInvoiceExpenses.length; x++){
                cost = cost + newInvoiceExpenses[x].cost
            }
            //updating the cost of the invoice the expense is associated with
            const newUpdatedInvoice = await Invoice.findByIdAndUpdate(newInvoice._id, {
                cost: Math.round(100*cost)/100
            })
        }
        res.status(200).json({
            cost: "$" + String(Math.round(100*cost)/100)
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const deleteExpense = async (req, res, next) => {
    try {

        //grabbing our expense
        const deletedExpense = await Expense.findByIdAndDelete(req.params.expense)

         //getting all the expenses associated with the invoice that are completed
         const invoiceExpenses = await Expense.find({invoice:deletedExpense.invoice, completed: true})

         //looping through all the completed invoice expenses to get a total cost
         let cost = 0
         for (x = 0; x < invoiceExpenses.length; x++){
             cost = cost + invoiceExpenses[x].cost
         }
 
         //updating the invoice with the new total cost
         const updatedInvoice = await Invoice.findByIdAndUpdate(deletedExpense.invoice, {
             cost: Math.round(100*cost)/100
         })

         //ending the request and returning the total cost to front-end to update page
         res.status(200).json({
             cost: '$' + String(Math.round(100*cost)/100)
         })

    } catch (error) {
        next(error)
        console.log(error.message)
    }
}

const completeExpense = async (req, res, next) => {
    try {

        //getting our expense
        const expense = await Expense.findById(req.params.expense)

        //if the expense.completed is false, make it true, else, make it false
        if(expense.completed == true){
            //changing the expense.completed to false
            const uncompletedExpense = await Expense.findByIdAndUpdate(req.params.expense, {
                completed: false
            })
        } else {
            //changing the expense.completed to true
            const completedExpense = await Expense.findByIdAndUpdate(req.params.expense, {
                completed: true
            })
        }

        //getting all the expenses associated with the invoice that are completed
        const invoiceExpenses = await Expense.find({invoice:expense.invoice, completed: true})

        //looping through all the completed invoice expenses to get a total cost
        let cost = 0
        for (x = 0; x < invoiceExpenses.length; x++){
            cost = cost + invoiceExpenses[x].cost
        }


        //updating the invoice with the new total cost
        const updatedInvoice = await Invoice.findByIdAndUpdate(expense.invoice, {
            cost: Math.round(100*cost)/100
        })

        //ending the request and returning the total cost to front-end to update page
        res.status(200).json({
            cost: '$' + String(Math.round(100*cost)/100)
        })

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