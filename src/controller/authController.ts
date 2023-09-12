import { Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { ILogin, IUserDB, IUserSingUp, IBooking } from '../Interface/interface';
import {
  createSendToken,
  correctPassword,
  hashPassword,
} from '../services/authServices';
import { addUser, fetchUser } from '../repo/authRepo';
import { mySqlConnection } from '..';
import { Query } from '../utils/query';
let query = new Query();
//login
export const login = async (req: Request, resp: Response) => {
  const user = <ILogin>req.body;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return resp.status(200).json({
        error: result,
      });
    }
    //find the user from the database
    const userDB = await fetchUser(user);
    //incorrect input
    if (!userDB || !(await correctPassword(user.password, userDB.password)))
      throw new Error('email or password is incorrect');

    createSendToken(userDB, 200, resp);
  } catch (error) {
    let message = '';
    if (error instanceof Error) message = error.message;
    return resp.status(400).json({
      status: 'fail',
      message: message,
    });
  }
};
// email password confirmPassword.
export const signup = async (req: Request, resp: Response) => {
  const user = <IUserSingUp>req.body;
  try {
    //some validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return resp.status(400).json({
        error: result.array(),
      });
    }

    if (user.password !== user.confirmPassword)
      throw new Error('passwords doesnot match');

    //encrypting password
    const encrptedPassword: string = await hashPassword(user.password);

    addUser({ password: encrptedPassword, email: user.email }, resp);
  } catch (error) {
    let message: string = '';
    if (error instanceof Error) message = error.message;
    resp.status(404).json({
      status: 'fail',
      message: message,
    });
  }
};
