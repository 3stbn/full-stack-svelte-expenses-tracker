import Transaction from '../models/Transaction';
import { buildSchema } from 'graphql';

export const schema = buildSchema(`
	scalar Date
	
	input sendTransaction {
		value: Int!
		date: Date
	}
    
    type Transaction {
        _id: ID!
        value: Int!
        date: Date
    },

    type Query {
        transactions: [Transaction]
        findTransaction( value: Int): Transaction
        transaction (_id: ID): Transaction
    },

    type Mutation {
        createTransaction(input: sendTransaction!): Transaction
        deleteTransaction(_id: ID!): Transaction
    },
`);

export const rootQuery = {
	transactions: async () => {
		return await Transaction.find();
	},
	findTransaction: async ({ value }) => {
		return await Transaction.findOne({ value: value });
	},
	transaction: async ({ _id }) => {
		return await Transaction.findById(_id);
	},
	createTransaction: async ({ input }) => {
		const transaction = new Transaction({ value: input.value, date: input.date });
		return await transaction.save();
	},
	deleteTransaction: async ({ _id }) => {
		return await Transaction.findByIdAndDelete({ _id: _id });
	},
};
