import { ILogin } from "../Interface/interface";
import { Response } from "express";
import { mySqlConnection } from "..";
export const addUser = (newUser: ILogin, resp: Response) => {
  mySqlConnection.query(
    `INSERT INTO signup(email,password) values('${newUser.email}','${newUser.password}')`,
    (error, rows) => {
      try {
        if (error) {
          console.log(error);
          throw error;
        }
        resp.status(201).json({
          status: "success",
        });
      } catch (error) {
        resp.status(404).json({
          status: "fail",
          message: "Email already in use",
        });
      }
    }
  );
};
