const Category = require('../models/categoryModel')
const Invoice = require('../models/invoiceModel')
const Expenses = require('../models/expenseModel')

const invoicePage = async (req, res) => {
    //if user is not logged in, then take home, else, go to invoice page
    if(req.user == undefined){
        res.render('login.ejs')
    } else {
        const invoices = await Invoice.find({user:req.user._id}) // getting our user invoice
        res.render('invoice.ejs', {
            user: req.user,
            invoices: invoices,
            csrfToken: req.csrfToken(),
            NODE_ENV: process.env.NODE_ENV
        })
    }
}

const addInvoice = async (req, res) => {  
    try {
        const {invoice_name, invoice_description, invoice_date} = req.body //grabbing data from the request body
        //checking if all form fields were filled out
        if(!invoice_name || !invoice_description || !invoice_date){
            throw new Error('Please fill out all the form fields')
        }
        //checking if this invoice name is already used
        const invoiceExists =  await Invoice.find({user:req.user._id, name:invoice_name})
        //if no items are found, invoiceExists will be an empty array
        if (invoiceExists.length > 0) {
            throw new Error('Invoice already exists')
        }
        //creating the new invoice
        const invoice = await Invoice.create({
            user: req.user._id,
            date: invoice_date,
            name: invoice_name,
            description: invoice_description,
        })
        //checking if the new invoice was created
        if(!invoice){
            throw new Error('Failed to create invoice')
        }
        //ending the request and reloading the invoice page
        res.status(200)
        res.redirect('/invoice')
    } catch (error) {
        next(error)
    }
}

const getInvoice = async (req, res) => {
    //if user is not logged in, then go to login page, else, load the single invoice
    if (req.user == undefined){
        res.render('login.ejs')
    } else {
        const categories = await Category.find({user:req.user._id}) //getting all categories associated with our user
        const invoice = await Invoice.findById(req.params.invoice) //getting the invoice associated with the id in the url (passed from <a> tag)
        const expenses = await Expenses.find({invoice:req.params.invoice}) //getting all the expenses associated with the invoice
        let cost = 0 // used to track the total cost of our expenses
        //using a forEach loop to sum up the cost of the expenses
        expenses.forEach(expense => {
            if (expense.completed === true){
                cost = cost + expense.price
            }
        })
        res.render('single_invoice.ejs', {
            user: req.user,
            categories: categories,
            invoice: invoice,
            expenses: expenses,
            cost: cost,
            csrfToken: req.csrfToken(),
            NODE_ENV: process.env.NODE_ENV
        })
    }
}

const getInvoiceTotal = async (req, res, next) => {
    try {
        let cost = 0 //tracking our total cost
        console.log(req.params.invoice)
        const expenses = await Expenses.find({invoice:req.params.invoice}) //getting all the expenses for our invoice
        //if we fail to get the expenses, throw an error
        if (!expenses){
            throw new Error('Failed to retrieve expenses')
        }
        //using a for loop to sum up the cost of the expenses
        expenses.forEach(expense => {
            if (expense.completed === true){
                cost = cost + expense.price
            }
        })
        res.status(200).json(cost) //sending json response with the cost
    } catch (error) {
        console.log(error.message)
        next(error)
    }  
}

module.exports = {
    invoicePage,
    addInvoice,
    getInvoice,
    getInvoiceTotal,
}