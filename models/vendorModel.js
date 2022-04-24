const mongoose = require('mongoose')

const vendorSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Vendor', vendorSchema)