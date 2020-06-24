import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from './config';
import { transaction } from './api/routes/transaction'

mongoose
    .connect(config.URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('App is connected to the cluster'))
    .catch(err => console.log(err));
const app = express();

app.listen(config.port, () => {
    console.log(`app is running in PORT: ${config.port}`);
});

app.use('/api/transaction', transaction);
