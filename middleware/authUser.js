const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authUser = async (req, res, next) => {
    try {
        const decoded = jwt.verify(req.signedCookies.token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded._id).select('-password')
        next()
    } catch (error) {
        console.log(error.message)
        res.redirect('/user/login')
    }
    
}

module.exports = authUser