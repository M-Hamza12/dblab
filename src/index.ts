import express from "express";
import dotenv from "dotenv";
import mysql from "mysql";
const app = express();

import userRouter from "./routes/userRoutes";
import { error } from "console";
import { stringify } from "querystring";

dotenv.config({
  path: "./src/config.env",
});

app.use(express.json());
app.use("/api/v1/user", userRouter);

export const mySqlConnection = mysql.createConnection({
  host: "localhost",
  password: "password",
  user: "root",
  database: "dblab",
});

mySqlConnection.connect((error) => {
  if (error) {
    console.log("error connecting to db " + JSON.stringify(error));
  } else {
    console.log("connected to db successfully");
  }
});

app.listen(3000, () => {
  console.log(process.env.name + " server is listening on port 3000");
});
