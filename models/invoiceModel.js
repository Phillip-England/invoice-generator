const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: String,
    },
    name: {
        type: String
    },
    description:{
        type: String
    },
    cost:{
        type: Number
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Invoice', invoiceSchema)