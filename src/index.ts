import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';
import cors from 'cors';
import { logger } from '../logger';

const app = express();
app.use(
  cors({
    origin: 'http://127.0.0.1:5173', // Replace with your React client's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);

import userRouter from './routes/userRoutes';
// import adminRouter from './routes/adminRoutes';
import cabinRouter from './routes/cabinRoutes';
import guestRouter from './routes/guestRoutes';
import bookingRouter from './routes/bookinRoutes';

dotenv.config({
  path: './src/config.env',
});

app.use(express.json());
app.use('/api/v1/user', userRouter);
// app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/cabin', cabinRouter);
app.use('/api/v1/guest', guestRouter);
app.use('/api/v1/bookin', bookingRouter);

export const mySqlConnection = mysql.createConnection({
  host: 'localhost',
  password: '',
  user: 'root',
  database: 'dblab',
});

mySqlConnection.connect((error) => {
  if (error) {
    logger.error('error connecting to db ' + JSON.stringify(error));
  } else {
    console.log('connected to db successfully');
  }
});

app.listen(3000, () => {
  logger.info(process.env.name + ' server is listening on port 3000');
});
