const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Invoice'
    },
    category: {
        type: String,
    },
    date: {
        type: String,
    },
    place: {
        type: String
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    completed: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Expense', expenseSchema)