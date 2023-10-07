import { mySqlConnection } from '..';
import { IBooking } from '../Interface/interface';
import { Response } from 'express';
import { CabinRepo } from './cabinRepo';
import { GuestRepo } from './guestRepo';
export class BookingRepo {
  static addBooking(booking: IBooking, resp: Response) {
    mySqlConnection.query('INSERT INTO BOOKING() VALUES()', (error, rows) => {
      try {
        if (error) throw error;
        resp.status(201).json({
          status: 'success',
        });
      } catch (error) {
        resp.status(404).json({
          status: 'fail',
        });
      }
    });
  }
  static async fetchGuest(guestId: number) {
    return await GuestRepo.fetchGuest(guestId);
  }
  static async fetchCabin(cabinId: number) {
    return await CabinRepo.fetchCabin(cabinId);
  }
}
