import Transaction from '../models/Transaction';
import { Error } from 'mongoose';

const get = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        if (!transactions) {
            throw Error('No Transactions!!');
        };
        res.status(200).json(transactions);
    } catch(err) {
        console.log({ error: err })
    };
};

const add = async (req, res) => {
    const { value, date } = req.body;
    const transaction = new Transaction({ value, date });
    try {
        const result = await transaction.save();
        if (!result) {
            throw Error('Failed to save the transaction');
        }
        res.status(200).json(result);
    } catch(err) {
        console.log({error: err});
    };
};

const remove = async (res, req) => {
    const { id } = res.params
    try {
        const transaction = await Transaction.find(id);
        if (!transaction) {
            throw Error('No Transaction Found!!');
        };
        const result = await transaction.remove();
    } catch(err) {
        console.log({error: err});
    };
};

export {
    get,
    add,
    remove
}