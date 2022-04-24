const Category = require('../models/categoryModel')
const Expense = require('../models/expenseModel')

//create a new expense category
const addCategory = async (req, res, next) => {
    try {
        const {category_name} = req.body
        //checking if form fields were completed
        if(!category_name){
            throw new Error('Please fill out all the form fields')
        }
        //checking if category already exists
        const categoryExists =  await Category.find({user:req.user._id, name:category_name})
        //if no items are found, categoryExists will be an empty array
        if (categoryExists.length > 0) {
            throw new Error('Category already exists')
        }
        //creating the new category
        const newCategory = Category.create({
            user: req.user._id,
            name: category_name,
        })
        //checking if category was actually created
        if (!newCategory){
            throw new Error('Failed to create new category')
        }
        //ending the request and redirecting back to category page
        res.status(200)
        res.redirect('/category')
    } catch (error) {
        next(error)
    }
}

//get category page
const categoryPage = async (req, res) => {
    //if user is not logged in, then redirect to login, else, take to category page
    if (req.user == undefined){
        res.render('login.ejs')
    } else {
        const categories = await Category.find({user:req.user._id}) //getting our users categories
        res.render('category.ejs', {
            user: req.user,
            categories: categories,
            csrfToken: req.csrfToken(),
            NODE_ENV: process.env.NODE_ENV
        })
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.category) //getting the category
        const deletedCategoryExpenses = await Expense.deleteMany({user: req.params.user, category: deletedCategory.name}) //getting all the expenses associated with the category
        res.status(200).json({
            deletedCategory,
            deletedCategoryExpenses
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addCategory,
    categoryPage,
    deleteCategory,
}