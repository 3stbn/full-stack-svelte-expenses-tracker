import Transaction from '../models/Transaction';
import { buildSchema } from 'graphql';

export const schema = buildSchema(`
    scalar Date
    type Transaction {
        _id: String!
        value: Int!
        date: Date!
    },

    type Query {
        transactions: [Transaction]
        transaction (_id: String!): Transaction
    }

    type Mutation {
        createTransaction(input: Int!): Transaction
        deleteTransaction(_id: String!): Transaction
    }
`);

export const rootQuery = {
	transactions: async () => {
		return await Transaction.find();
	},
	transaction: async (args) => {
		return await Transaction.findById(args._id);
	},
	createTransaction: async ({ input }) => {
		const transaction = new Transaction({ value: input });
		return await transaction.save();
	},
	deleteTransaction: async ({ _id }) => {
        const result = await Transaction.findByIdAndDelete({ _id: _id });
        console.log(result);
        return result;
	},
};
