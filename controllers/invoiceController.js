const Category = require('../models/categoryModel')

const invoicePage = async (req, res) => {
    //if user is not logged in, then take home, else, go to invoice page
    if(req.user == undefined){
        res.render('login.ejs')
    } else {
        const categories = await Category.find({user:req.user}) //getting our users categories
        res.render('invoice.ejs', {
            user: req.user,
            categories: categories,
            csrfToken: req.csrfToken(),
            NODE_ENV: process.env.NODE_ENV
        })
    }
}

module.exports = {
    invoicePage,
}