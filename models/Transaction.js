const { Schema, model } = require('mongoose')

const now = new Date().getTime()
const TransactionSchema = new Schema({
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        default: now,
    },
    user_id: {
        type: String,
        required: true,
    },
})

const Transaction = model('transaction', TransactionSchema)

module.exports = Transaction
