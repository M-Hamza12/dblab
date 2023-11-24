import { mySqlConnection } from '..';
import { IBooking } from '../Interface/interface';
import { Response } from 'express';
import { CabinRepo } from './cabinRepo';
import { GuestRepo } from './guestRepo';
import { formatDate } from '../utils/date';
import { IParamQuery } from '../Interface/interface';
import { fetchModel, deleteModel, updateModel } from './genericRepo';
import { Query } from '../utils/query';
export class BookingRepo {
  static addBooking(booking: IBooking, resp: Response) {
    console.log(booking);
    let query = `INSERT INTO BOOKINGS VALUES(${booking.id},'${formatDate()}','${
      booking.startDate
    }','${booking.endDate}',${booking.numNights},${booking.numGuests},${
      booking.cabinPrice
    },${booking.extrasPrice},${booking.totalPrice},'${booking.status}','${
      booking.observation ? booking.observation : ''
    }',${booking.cabinId},${booking.guestId},${
      booking.hasBreakFast
    },NULL,NULL,${booking.dealId ? booking.dealId : 'NULL'},${
      booking.hasSmoking
    })`;
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
  static async fetchGuest(guestId: number) {
    try {
      const guest = await GuestRepo.fetchGuest(guestId);
      return guest;
    } catch (error) {
      throw error;
    }
  }
  static async fetchCabin(cabinId: number) {
    try {
      const cabin = await CabinRepo.fetchCabin(cabinId);
      return cabin;
    } catch (error) {
      throw error;
    }
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
      const booking = await fetchModel<IBooking[]>(
        'SELECT * FROM BOOKINGS WHERE ID = ' + bookingId
      );
      if (!booking) throw new Error('No such booking');
      return booking[0];
    } catch (error) {
      throw error;
    }
  }
  static async getBookingByCabinId(
    cabinId: number
  ): Promise<IBooking[] | null> {
    try {
      const booking = await fetchModel<IBooking[]>(
        'SELECT * FROM BOOKINGS WHERE cabinId = ' + cabinId
      );
      if (!booking) throw new Error('No such booking');
      return booking;
    } catch (error) {
      throw error;
    }
  }
  static async updateBooking(bookingId: number, data: any) {
    try {
      const query = Query.updateById(bookingId, 'bookings', data);

      await updateModel(query);
    } catch (error) {
      throw error;
    }
  }
  static async deleteBooking(bookingId: number): Promise<string> {
    try {
      let query = Query.deleteById(bookingId, 'CABINS');
      return await deleteModel(query);
    } catch (error) {
      throw error;
    }
  }
  static async getBookingOfPastDays(days: number): Promise<IBooking[]> {
    try {
      let date = formatDate(new Date(Date.now() - days * 24 * 60 * 60 * 1000));

      let query = `SELECT * FROM BOOKINGS WHERE startDate >= "${date}"`;

      const bookings = await fetchModel<IBooking[]>(query);
      return bookings;
    } catch (error) {
      throw error;
    }
  }
  static async getTodayActivity() {
    try {
      let date = formatDate(new Date(Date.now()));
      let query = `SELECT * FROM BOOKINGS WHERE (status = 'checkIn' and checkInDate = '${date}') OR (status = 'checkOut' and checkOutDate = '${date}')`;
      console.log(date);
      const bookings = await fetchModel<IBooking[]>(query);
      return bookings;
    } catch (error) {
      throw error;
    }
  }
}
