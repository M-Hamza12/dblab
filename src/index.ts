import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';
import cors from 'cors';

dotenv.config({
  path: './src/config.env',
});

console.log(
  process.env.AWS_ACCESS_KEY,
  process.env.AWS_SECRET_ACCESS_KEY,
  process.env.AWS_REGION
);
const app = express();

app.use(
  // cors({
  //   origin: 'http://127.0.0.1:5173', // Replace with your React client's URL
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // })
  cors()
);

import userRouter from './routes/userRoutes';
// import adminRouter from './routes/adminRoutes';
import cabinRouter from './routes/cabinRoutes';
import guestRouter from './routes/guestRoutes';
import bookingRouter from './routes/bookinRoutes';
import dealRouter from './routes/dealRoute';
import itemRouter from './routes/itemRoutes';
import feaureRouter from './routes/featureRoutes';
import orderRouter from './routes/orderRoutes';
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
app.use('/api/v1/feature', feaureRouter);
app.use('/api/v1/order', orderRouter);

export const mySqlConnection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  password: '',
  user: 'root',
  database: 'dblab',
});

mySqlConnection.connect((error) => {
  if (error) {
    console.log('error connecting to db ' + JSON.stringify(error));
    throw new Error('error connecting to db ' + JSON.stringify(error));
  } else {
    console.log('connected to db successfully');
  }
});

app.listen(3001, () => {
  console.log(process.env.name + ' server is listening on port 3001');
});
