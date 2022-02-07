const { Schema, model } = require('mongoose')

const TransactionSchema = new Schema({
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        default: function(){return +new Date() + 7*24*60*60*1000},
    },
})

const Transaction = model('transaction', TransactionSchema)

module.exports = Transaction
