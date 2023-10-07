import { mySqlConnection } from '..';
import { IGuest } from '../Interface/interface';
import { Response } from 'express';
import { fetchModel } from './genericRepo';

export class GuestRepo {
  static async addGuest(resp: Response, guest: IGuest) {
    const query = `INSERT INTO GUESTS(id,createdAt,fullName,nationalId,countryFlag)
                 VALUES(${guest.id},'${guest.createdAt}','${guest.fullName}','${guest.nationalId}','${guest.countryFlag}')`;

    mySqlConnection.query(query, (error, rows) => {
      try {
        if (error) throw error;
        resp.status(201).json({
          status: 'success',
        });
      } catch (error) {
        resp.status(404).json({
          status: 'fail',
          error,
        });
      }
    });
  }

  static async fetchGuest(guestId: number): Promise<IGuest | null> {
    try {
      const guest = await fetchModel<IGuest>(
        'SELECT * FROM GUEST WHERE id=' + guestId
      );
      return guest;
    } catch (error) {
      return null;
    }
  }
}
