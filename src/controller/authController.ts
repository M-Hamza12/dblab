import { Request, Response, NextFunction } from "express";
import { ILogin, IUserDB } from "../Interface/interface";
import { createSendToken, correctPassword } from "../services/authServices";
import { mySqlConnection } from "..";
import { Query } from "../utils/query";
let query = new Query();
//login
export const login = async (req: Request, resp: Response) => {
  const user = <ILogin>req.body;
  try {
    if (!user.email || !user.password) {
      throw new Error("email or password is incorrect");
    }
    //find the user from the database
    let queryString =
      query.SELECT(["*"], "USER") + query.WHERE("email", user.email);
    let userDB: IUserDB = { email: "", password: "", id: 1 };
    await mySqlConnection.query(queryString, async (error, rows) => {
      if (error) {
        throw new Error("email or password is incorrect");
      } else {
        //this means no data was retrieved.
        if (rows.length === 0)
          throw new Error("email or password is incorrect");
        userDB = rows[0];
        //if the user doesnt exist or password is incorrect
        if (!(await correctPassword(user.password, userDB.password)))
          throw new Error("email or password is incorrect");

        createSendToken(userDB, 200, resp);
      }
    });
  } catch (error) {
    let message = "";
    if (error instanceof Error) error = error.message;
    return resp.status(400).json({
      status: "fail",
      message: message,
    });
  }
};
