import { mySqlConnection } from '..';
import { Query } from '../utils/query';
import { IGuest, IParamQuery, IUpdateGuest } from '../Interface/interface';
import { Response } from 'express';
import { deleteModel, fetchModel, updateModel, addModel } from './genericRepo';
import { param } from 'express-validator';

export class GuestRepo {
  static async addGuest(guest: IGuest): Promise<string> {
    const query = `INSERT INTO GUESTS(id,createdAt,fullName,nationalId,countryFlag,totalBooking)
                 VALUES(${guest.id},'${guest.createdAt}','${guest.fullName}','${guest.nationalId}','${guest.countryFlag}',0)`;
    try {
      return await addModel(query);
    } catch (error) {
      throw error;
    }
  }
  static async getAllGuest(param: IParamQuery): Promise<IGuest[]> {
    try {
      if (!param.sortBy) param.sortBy = 'createdAt-desc';
      let where = '';
      if (param.totalBooking) {
        if (param.totalBooking === 'true')
          where += ' where g.totalBooking > 0 ';
        else where += '  where g.totalBooking = 0 ';
      }
      const guests = await fetchModel(
        `select g.id,g.fullName,g.createdAt,g.email,g.countryFlag,g.nationalId,g.ProfilePicture,g.role,g.totalBooking,IFNULL(sum(b.totalPrice),0) as 'totalSpending' from guests g 
        left outer join bookings b on b.guestId = g.id ` +
          where +
          ` group by g.id,g.fullName,g.createdAt,g.email,g.countryFlag,g.nationalId,g.ProfilePicture,g.role,g.totalBooking  ` +
          Query.paramQuery(param)
      );
      return guests as IGuest[];
      // let query = 'SELECT * FROM GUESTS ' + where + Query.paramQuery(param);
      // console.log('guest query ', query);
      // return await fetchModel(query);
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
  static async fetchAllGuestWithSpending(param: IParamQuery) {
    try {
      if (!param.sortBy) param.sortBy = 'createdAt-desc';
      const guests = await fetchModel(
        `select g.id,g.fullName,g.createdAt,g.email,g.countryFlag,g.nationalId,g.ProfilePicture,g.role,g.totalBooking,IFNULL(sum(b.totalPrice),0) as 'totalSpending' from guests g 
        left outer join bookings b on b.guestId = g.id
        group by g.id,g.fullName,g.createdAt,g.email,g.countryFlag,g.nationalId,g.ProfilePicture,g.role,g.totalBooking  ` +
          Query.paramQuery(param)
      );
      return guests;
    } catch (error) {
      throw error;
    }
  }
  static async getGuestCount(param: IParamQuery): Promise<number> {
    let where = '';
    if (param.totalBooking) {
      if (param.totalBooking === 'true') where += ' where totalBooking > 0 ';
      else where += '  where totalBooking = 0 ';
    }
    const guests = await fetchModel<{ count: number }[]>(
      "SELECT count(*) as 'count' FROM guests " + where
    );
    console.log(guests);
    return guests[0].count;
  }
}
