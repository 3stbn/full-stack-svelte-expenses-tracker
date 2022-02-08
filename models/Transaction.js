const { Schema, model } = require('mongoose')

const TransactionSchema = new Schema({
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        default: () => Date.now(),
    },
})

const Transaction = model('transaction', TransactionSchema)

module.exports = Transaction
