import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: 'http://127.0.0.1:5173', // Replace with your React client's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);

import userRouter from './routes/userRoutes';
import adminRouter from './routes/adminRoutes';
import cabinRouter from './routes/cabinRoutes';
import { error } from 'console';
import { stringify } from 'querystring';

dotenv.config({
  path: './src/config.env',
});

app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/cabin', cabinRouter);

export const mySqlConnection = mysql.createConnection({
  host: 'localhost',
  password: '',
  user: 'root',
  database: 'dblab',
});

mySqlConnection.connect((error) => {
  if (error) {
    console.log('error connecting to db ' + JSON.stringify(error));
  } else {
    console.log('connected to db successfully');
  }
});

app.listen(3000, () => {
  console.log(process.env.name + ' server is listening on port 3000');
});
