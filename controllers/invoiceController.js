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
        //ending the request and redirecting back to home page
        res.status(200)
        res.redirect('/invoice/categories')
    } catch (error) {
        next(error)
    }
}

//get category page
const categoryPage = (req, res) => {
    res.render('categories.ejs', {
        user: req.user,
        csrfToken: req.csrfToken()
    })
}

module.exports = {
    addCategory,
    categoryPage,
}