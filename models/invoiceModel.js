const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
    },
    name: {
        type: String
    },
    description:{
        type: String
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Invoice', invoiceSchema)