const Category = require('../models/categoryModel')
const Invoice = require('../models/invoiceModel')
const Expense = require('../models/expenseModel')
const Vendor = require('../models/vendorModel')

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

const addInvoice = async (req, res, next) => {  
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
            cost: 0
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

const getInvoiceSinglePage = async (req, res) => {
    //if user is not logged in, then go to login page, else, load the single invoice
    if (req.user == undefined){
        res.render('login.ejs')
    } else {
        const categories = await Category.find({user:req.user._id}) //getting all categories associated with our user
        const invoice = await Invoice.findById(req.params.invoice) //getting the invoice associated with the id in the url (passed from <a> tag)
        const expenses = await Expense.find({invoice:req.params.invoice}) //getting all the expenses associated with the invoice
        const vendors = await Vendor.find({user:req.user._id})
        res.render('single_invoice.ejs', {
            user: req.user,
            categories: categories,
            invoice: invoice,
            expenses: expenses,
            vendors: vendors,
            csrfToken: req.csrfToken(),
            NODE_ENV: process.env.NODE_ENV
        })
    }
}

const generateInvoicePdf = async (req, res, next) => {
    try {
        const categories = await Category.find({user:req.user._id}) //getting all categories associated with our user
        const invoice = await Invoice.findById(req.params.invoice) //getting the invoice associated with the id in the url (passed from <a> tag)
        const expenses = await Expense.find({invoice:req.params.invoice}) //getting all the expenses associated with the invoice    
        res.render('print_invoice.ejs', {
            user: req.user,
            categories: categories,
            invoice: invoice,
            expenses: expenses,
            NODE_ENV: process.env.NODE_ENV
        })
    } catch (error) {
        next(error)
    }       
}

const deleteInvoice = async (req, res, next) => {
    try {
        //getting the current invoice
        const deletedInvoice = await Invoice.deleteOne({id:req.params.invoice})
        //getting all the expenses associated with the invoice
        const deletedExpenses = await Expense.deleteMany({invoice:req.params.invoice})
        //throwing an error if the above did not work
        if (!deletedExpenses || !deletedInvoice){
            throw new Error('Failed to delete invoice and expenses')
        }
        res.status(200).json({
            deletedInvoice,
            deletedExpenses
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    invoicePage,
    addInvoice,
    getInvoiceSinglePage,
    generateInvoicePdf,
    deleteInvoice,
}