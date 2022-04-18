const Category = require('../models/categoryModel')

//create a new expense category
const addCategory = async (req, res, next) => {
    try {
        const {category_name, category_description} = req.body
        //checking if form fields were completed
        if(!category_name || !category_description){
            throw new Error('Please fill out all the form fields')
        }
        //checking if category already exists
        const categoryExists =  await Category.find({user:req.user._id, name:category_name})
        if (categoryExists.length > 0) {
            throw new Error('Category already exists')
        }
        //creating the new category
        const newCategory = Category.create({
            user: req.user._id,
            name: category_name,
            description: category_description
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

const deleteCategory = async (req, res) => {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedCategory)
}

module.exports = {
    addCategory,
    categoryPage,
    deleteCategory,
}