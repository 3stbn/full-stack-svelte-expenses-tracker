import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config.js';
import config from './config';
import { schema, rootQuery } from './api/controller/transaction';
import graphqlHttp from 'express-graphql';

// import { transaction } from './api/routes/transaction';

mongoose
	.connect(config.URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('App is connected to the cluster'))
	.catch((err) => console.log(err));

const app = express();

app.use(cors());
// to log the HTTP requests
app.use(morgan('tiny'));
// to parse JSON object as req.body
app.use(express.json());

app.use(
	'/api/transaction',
	graphqlHttp({
		schema: schema,
		rootValue: rootQuery,
		graphiql: process.env.NODE_ENV === 'development',
	})
);

app.listen(config.port, () => {
	console.log(`app is running in PORT: ${config.port}`);
});
