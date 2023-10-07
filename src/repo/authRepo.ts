import { ILogin, IUserDB } from '../Interface/interface';
import { Response } from 'express';
import { mySqlConnection } from '..';
import { addModel, fetchModel } from './genericRepo';
import { Query } from '../utils/query';
let query = new Query();

export class AuthRepo {
  static async fetchUser(user: ILogin): Promise<IUserDB | null> {
    let q = query.SELECT(['*'], 'signup') + query.WHERE('email', user.email);
    try {
      const user = await fetchModel<IUserDB>(q);
      return user;
    } catch (error) {
      return null;
    }
  }
  static async addUser(newUser: ILogin, resp: Response) {
    let query = `INSERT INTO signup(email,password) values('${newUser.email}','${newUser.password}')`;
    try {
      const message = await addModel(query);
      resp.status(201).json({
        status: 'success',
        message,
      });
    } catch (error) {
      resp.status(400).json({
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
