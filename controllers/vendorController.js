const Vendor = require('../models/vendorModel')


// @ GET
// @ PRIVATE
// @ Localhost:5000/vendor
const vendorPage = async (req, res, next) => {
    try {
        //pulling in all vendors associated with our user
        const vendors = await Vendor.find({user:req.user._id})
        //loading vendor.ejs with all our data
        res.render('vendor.ejs', {
            user: req.user,
            vendors: vendors,
            NODE_ENV: process.env.NODE_ENV,
            csrfToken: req.csrfToken()
        })    
    } catch (error) {
        next(error)
    }
}


// @ POST
// @ PRIVATE
// @ Localhost:5000/vendor/addVendor
const addVendor = async (req, res, next) => {
    try {
        //getting form data from req.body
        const {vendor_name} = req.body
        //checking the see if all the form data was filled out
        if (!vendor_name){
            throw new Error('Please fill out all the form data')
        }
        //checking to see if the vendor already exists
        const vendorExists = await Vendor.find({name:vendor_name})
        if (vendorExists.length > 0){
            throw new Error('Vendor already exists')
        }
        //creating the vendor
        const newVendor = await Vendor.create({
            user: req.user._id,
            name: vendor_name
        })
        //ending the request and reloading the page
        res.status(200).redirect('/vendor')
    } catch (error) {
        next(error)
    }
}

// @ DELETE
// @ PRIVATE
// @ Localhost:5000/vendor/deleteVendor/:vendor
const deleteVendor = async (req, res, next) => {
    try {
        //deleting our vendor
        const deletedVendor = await Vendor.findByIdAndDelete(req.params.vendor)
        //ending our request
        res.status(200).json({
            vendor: deletedVendor
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    vendorPage,
    addVendor,
    deleteVendor,
}