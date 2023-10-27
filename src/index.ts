import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';
import AWS from 'aws-sdk';
import cors from 'cors';

dotenv.config({
  path: './src/config.env',
});

// const awsCrededntials = new AWS.Credentials(
//   process.env.AWS_ACCESS_KEY as string,
//   process.env.AWS_SECRET_ACCESS_KEY as string,
//   process.env.AWS_REGION as string
// ); // const AWSClient = new AWS({});
// AWS.config.update({
//   region: process.env.AWS_REGION,
//   credentials: awsCrededntials,
// });
console.log(
  process.env.AWS_ACCESS_KEY,
  process.env.AWS_SECRET_ACCESS_KEY,
  process.env.AWS_REGION
);
const app = express();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
AWS.config.logger = console;
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
import dealRouter from './routes/dealRoute';

dotenv.config({
  path: './src/config.env',
});
import imageRouter from './routes/imageRoutes';

app.use(express.json());
app.use('/api/v1/user', userRouter);
// app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/cabin', cabinRouter);
app.use('/api/v1/guest', guestRouter);
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/deals', dealRouter);
app.use('/api/v1/bookin', bookingRouter);
app.use('/api/v1/image', imageRouter);

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
