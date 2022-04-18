const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Invoice'
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Expense', expenseSchema)