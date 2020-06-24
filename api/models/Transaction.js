import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    value : {
        type: Number,
        required: true
    },
    date : {
        type: Number,
        default : Date.now(),
        required : true
    }
});

export const Transaction  = mongoose.model('Transaction', transactionSchema);
