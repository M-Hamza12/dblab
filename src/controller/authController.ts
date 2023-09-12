import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { ILogin, IUserSingUp } from '../Interface/interface';
import { refactorErrorMessage } from '../utils/error';
import { promisify } from 'util';
import {
  createSendToken,
  correctPassword,
  hashPassword,
  decodeToken,
} from '../services/authServices';
import { addUser, fetchUser, fetchUserById } from '../repo/authRepo';

//login
export const login = async (req: Request, resp: Response) => {
  const user = <ILogin>req.body;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const error = refactorErrorMessage(result);
      return resp.status(200).json({
        status: 'fail',
        error,
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

export const signup = async (req: Request, resp: Response) => {
  const user = <IUserSingUp>req.body;
  try {
    //some validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const error = refactorErrorMessage(result);
      return resp.status(400).json({
        status: 'fail',
        error,
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
export const protect = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization?.startsWith('Bearer'))
      throw new Error('Token is invalid');
    const token = req.headers.authorization.split(' ')[1];
    if (token.length === 0) throw new Error('Token is invalid');
    const decoded = await decodeToken(token);
    const user = fetchUserById(decoded.id);
    req.body.user = user;
    next();
  } catch (error) {
    resp.status(400).json({
      status: 'fail',
      errror: 'Bearer token is invalid',
    });
  }
};
