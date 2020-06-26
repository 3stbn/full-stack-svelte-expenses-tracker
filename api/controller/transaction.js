import Transaction from '../models/Transaction';

async function get(req, res) {
	try {
		const transactions = await Transaction.find();
		if (!transactions) {
			throw Error('No Transactions!!');
		}
		res.status(200).json(transactions);
	} catch (err) {
		console.error(err.message);
		res.status(400).json({ message: err });
	}
}

async function add(req, res) {
	const transaction = new Transaction({ value: req.body.value });
	try {
		const result = await transaction.save();
		if (!result) {
			throw Error('Failed to save the transaction');
		}
		res.status(200).json(result);
	} catch (err) {
		console.error(err.message);
		res.status(400).json({ message: err });
	}
}

async function remove(req, res) {
	const { id } = req.params;
	try {
		const transaction = await Transaction.findById(id);
		if (!transaction) {
			throw Error('No Transaction Found!!');
		}
		const result = await transaction.remove();
		if (!result) {
			throw Error('Error deleting transaction');
		}
		res.status(200).json(result);
	} catch (err) {
		console.error(err.message);
		res.status(400).json({ message: err });
	}
}

export { get, add, remove };
