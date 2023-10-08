import { Request, Response, NextFunction } from 'express';
import { ILogin, IUserSingUp } from '../Interface/interface';
import {
  createSendToken,
  correctPassword,
  hashPassword,
  decodeToken,
} from '../services/authServices';
import { AuthRepo } from '../repo/authRepo';

export class AuthController {
  static async login(req: Request, resp: Response) {
    const user = <ILogin>req.body;
    try {
      //find the user from the database
      const userDB = await AuthRepo.fetchUser(user);
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
  }
  static async protect(req: Request, resp: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization?.startsWith('Bearer'))
        throw new Error('Token is invalid');
      const token = req.headers.authorization.split(' ')[1];
      if (token.length === 0) throw new Error('Token is invalid');
      const decoded = await decodeToken(token);
      const user = AuthRepo.fetchUserById(decoded.id);
      req.body.user = user;
      next();
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        errror: 'You are not authorized',
      });
    }
  }

  static async signup(req: Request, resp: Response) {
    const user = <IUserSingUp>req.body;
    try {
      if (user.password !== user.confirmPassword)
        throw new Error('passwords doesnot match');

      //encrypting password
      const encrptedPassword: string = await hashPassword(user.password);

      AuthRepo.addUser({ password: encrptedPassword, email: user.email }, resp);
    } catch (error) {
      let message: string = '';
      if (error instanceof Error) message = error.message;
      resp.status(404).json({
        status: 'fail',
        message: message,
      });
    }
  }
}
