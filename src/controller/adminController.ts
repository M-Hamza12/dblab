import { Request, Response } from 'express';
import { adminRepo } from '../repo/adminRepo';
import { Iadmin } from '../Interface/interface';
import { hashPassword } from '../services/authServices';
import { createSendToken, correctPassword } from '../services/authServices';
import generateUniqueId from 'generate-unique-id';

export class adminController {
  static async addAdmin(req: Request, resp: Response) {
    try {
      const admin = req.body as Iadmin;
      admin.id = +generateUniqueId({
        useLetters: false,
        useNumbers: true,
        length: 10,
      });
      // authentication
      if (admin.password !== admin.confirmPassword)
        throw new Error('password does not match');

      const encrptedPassword: string = await hashPassword(admin.password);

      admin.password = encrptedPassword;

      await adminRepo.addAdmin(admin);
      resp.status(201).json({
        status: 'success',
      });
    } catch (error) {
      resp.status(404).json({
        status: 'fail',
        error,
      });
    }
  }

  static async adminLogin(req: Request, resp: Response) {
    try {
      console.log('in here');
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
      //fetching admin
      const admin = await adminRepo.fetchAdminByEmail(email);
      if (!admin || !(await correctPassword(password, admin.password))) {
        throw new Error('invalid email or password');
      }
      //sending token
      createSendToken(admin, 200, resp);
    } catch (error) {
      resp.status(404).json({
        status: 'fail',
        message: 'email or password is invalid',
      });
    }
  }
}
