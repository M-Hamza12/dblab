import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your React client's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);

import userRouter from './routes/userRoutes';
// import adminRouter from './routes/adminRoutes';
import cabinRouter from './routes/cabinRoutes';
import guestRouter from './routes/guestRoutes';
import bookingRouter from './routes/bookinRoutes';
import dealRouter from './routes/dealRoute';
import itemRouter from './routes/itemRoutes';

dotenv.config({
  path: './src/config.env',
});

app.use(express.json());
app.use('/api/v1/user', userRouter);
// app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/cabin', cabinRouter);
app.use('/api/v1/guest', guestRouter);
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/deals', dealRouter);
app.use('/api/v1/item', itemRouter);

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

app.listen(3001, () => {
  console.log(process.env.name + ' server is listening on port 3001');
});
