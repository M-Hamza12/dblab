import { mySqlConnection } from '..';
import { IBooking } from '../Interface/interface';
import { Response } from 'express';
import { CabinRepo } from './cabinRepo';
import { GuestRepo } from './guestRepo';
import { IParamQuery } from '../Interface/interface';
import { fetchModel, deleteModel } from './genericRepo';
import { Query } from '../utils/query';
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
  static async getAllBookings(param: IParamQuery): Promise<IBooking[] | null> {
    try {
      const bookings = (await fetchModel(
        'SELECT * FROM Bookings' + Query.paramQuery(param)
      )) as IBooking[];
      return bookings;
    } catch (error) {
      throw error;
    }
  }
  static async getBookingById(bookingId: number): Promise<IBooking | null> {
    try {
      const booking = await fetchModel<IBooking>(
        'SELECT * FROM BOOKINGS WHERE ID = ' + bookingId
      );
      if (!booking) throw new Error('No such booking');
      return booking;
    } catch (error) {
      throw error;
    }
  }
  static async deleteBooking(bookingId: number): Promise<string> {
    try {
      return await deleteModel('Delete from Bookings where id = ' + bookingId);
    } catch (error) {
      throw error;
    }
  }
}
