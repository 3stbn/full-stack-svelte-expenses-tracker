import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
	value: {
		type: Number,
		required: true,
	},
	date: {
		type: Number,
		default: Date.now(),
		required: true,
	},
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
