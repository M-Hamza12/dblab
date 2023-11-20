import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Response } from 'express';
import { promisify } from 'util';
import { IUserDB } from '../Interface/interface';

const signToken = (id: number): string => {
  //   return jwt.sign({ id }, process.env.JWT_SECRET , {
  //     expiresIn: process.env.JWT_EXPIRES_IN,
  //   });
  return jwt.sign({ id }, String(process.env.JWT_SECRET), {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
export const createSendToken = (
  user: IUserDB,
  statusCode: number,
  res: Response
) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  //   if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      emai: user.email,
      id: user.id,
    },
  });
};
export const correctPassword = async (
  enteredPassword: string,
  passwordDB: string
) => {
  // enteredPassword = await bcrypt.hash(enteredPassword, 10);
  const validity = await bcrypt.compare(enteredPassword, passwordDB);
  return validity;
  // return enteredPassword === passwordDB;
};

export const hashPassword = async (password: string): Promise<string> => {
  const encrptedPassword = await bcrypt.hash(password, 10);
  return encrptedPassword;
};

export const decodeToken = async (token: string): Promise<any> => {
  const secret = process.env.JWT_SECRET as string;
  return await jwtVerifyPromisified(token, secret);
};
const jwtVerifyPromisified = (token: string, secret: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, {}, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};
