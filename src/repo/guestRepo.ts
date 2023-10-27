import { mySqlConnection } from '..';
import { Query } from '../utils/query';
import { IGuest, IUpdateGuest } from '../Interface/interface';
import { Response } from 'express';
import { deleteModel, fetchModel, updateModel, addModel } from './genericRepo';

export class GuestRepo {
  static async addGuest(guest: IGuest): Promise<string> {
    const query = `INSERT INTO GUESTS(id,createdAt,fullName,nationalId,countryFlag)
                 VALUES(${guest.id},'${guest.createdAt}','${guest.fullName}','${guest.nationalId}','${guest.countryFlag}')`;
    try {
      return await addModel(query);
    } catch (error) {
      throw error;
    }
  }
  static async getAllGuest(): Promise<IGuest[]> {
    try {
      let query = 'SELECT * FROM GUESTS';
      return await fetchModel(query);
    } catch (error) {
      throw error;
    }
  }
  static async fetchGuest(guestId: number): Promise<IGuest> {
    try {
      const guest = await fetchModel<IGuest[]>(
        'SELECT * FROM GUESTS WHERE id=' + guestId
      );
      return guest[0];
    } catch (error) {
      throw error;
    }
  }
  static async updateGuest(
    guestId: number,
    data: IUpdateGuest
  ): Promise<string> {
    try {
      const query = Query.updateById(guestId, 'Guests', data);
      return await updateModel(query);
    } catch (error) {
      throw error;
    }
  }
  static async deleteGuest(guestId: number): Promise<string> {
    try {
      const query = Query.deleteById(guestId, 'Guests');
      return await deleteModel(query);
    } catch (error) {
      throw error;
    }
  }
}
