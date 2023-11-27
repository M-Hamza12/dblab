import { IGuest, ILogin, IUserDB } from '../Interface/interface';
import { Response } from 'express';
import { mySqlConnection } from '..';
import { addModel, fetchModel } from './genericRepo';
import { Query } from '../utils/query';
let query = new Query();

export class AuthRepo {
  static async fetchUser(user: ILogin): Promise<IGuest | null> {
    let q = query.SELECT(['*'], 'guests') + query.WHERE('email', user.email);
    try {
      const user = await fetchModel<IGuest[]>(q);
      console.log('user : ', user);
      return user[0];
    } catch (error) {
      return null;
    }
  }
  static async addUser(newUser: IGuest, resp: Response) {
    const defaultProfilePicture =
      process.env.DEFAULT_PROFILE_PICTURE ?? 'default.png';
    let query = `INSERT INTO guests (email, password, nationalId, countryFlag, profilePicture , fullName ) VALUES ('${newUser.email}', '${newUser.password}', '${newUser.nationalId}', '${newUser.countryFlag}', '${newUser.profilePicture}','${newUser.fullName}')`;
    try {
      const message = await addModel(query);
      resp.status(201).json({
        status: 'success',
        message,
      });
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        error: error,
      });
    }
  }

  static async fetchUserById(id: number): Promise<IUserDB | null> {
    let q = query.SELECT(['*'], 'signup') + query.WHERE('id', id);
    try {
      const user = await fetchModel<IUserDB>(q);
      return user;
    } catch (error) {
      return null;
    }
  }
}
