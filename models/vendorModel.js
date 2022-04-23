const mongoose = require('mongoose')

const vendorSchema = mongoose.Schema({
    name: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Vendor', vendorSchema)