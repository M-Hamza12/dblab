import { Request, Response } from "express";
import validator from "validator";
import { ILogin, IUserDB, IUserSingUp } from "../Interface/interface";
import {
  createSendToken,
  correctPassword,
  hashPassword,
} from "../services/authServices";
import { addUser } from "../repo/authRepo";
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
      query.SELECT(["*"], "signup") + query.WHERE("email", user.email);
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
// email password confirmPassword.
export const signup = async (req: Request, resp: Response) => {
  const user = <IUserSingUp>req.body;
  try {
    //some validation
    if (!user.email || !user.password || !user.confirmPassword)
      throw new Error("Please fill all fields");

    if (user.password !== user.confirmPassword)
      throw new Error("passwords doesnot match");

    if (!validator.isEmail(user.email))
      throw new Error("please enter a valid email");

    //encrypting password
    const encrptedPassword: string = await hashPassword(user.password);

    addUser({ password: encrptedPassword, email: user.email }, resp);
  } catch (error) {
    console.log("in here");
    let message: string = "";
    if (error instanceof Error) message = error.message;
    resp.status(404).json({
      status: "fail",
      message: message,
    });
  }
};
