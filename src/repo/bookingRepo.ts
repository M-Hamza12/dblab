import { mySqlConnection } from '..';
import {
  IBooking,
  IFormatBooking,
  ICabin,
  IOrder,
  Iitem,
  IGuest,
} from '../Interface/interface';
import { Response } from 'express';
import { CabinRepo } from './cabinRepo';
import { GuestRepo } from './guestRepo';
import { formatDate } from '../utils/date';
import { IParamQuery } from '../Interface/interface';
import { fetchModel, deleteModel, updateModel } from './genericRepo';
import { Query } from '../utils/query';
export class BookingRepo {
  static async addBooking(booking: IBooking, resp: Response) {
    console.log(booking);
    // const regularPrice = await fetchModel<{ regularPrice: number }[]>(
    //   'Select regularPrice from cabins where id = ' + booking.cabinId
    // );
    // booking.totalPrice = regularPrice[0].regularPrice;
    console.log(booking.totalPrice);
    let query = `INSERT INTO BOOKINGS VALUES(${booking.id},'${formatDate()}','${
      booking.startDate
    }','${booking.endDate}',${booking.numNights},${booking.totalPrice},'${
      booking.status
    }',NULL,NULL,${booking.isPaid},'${booking.description}',${
      booking.cabinId
    },${booking.guestId},'${
      booking.paymentMethod ? booking.paymentMethod : 'cash'
    }')`;
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
  static async getBookingsByCabinId(cabinId: number) {
    try {
      const bookings = await fetchModel<IBooking[]>(
        `SELECT startDate , endDate FROM BOOKINGS WHERE cabinId = ${cabinId}`
      );
      return bookings;
    } catch (error) {
      throw error;
    }
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
      if (!param.sortBy) param.sortBy = 'createdAt-desc';
      const status: string = param.status
        ? ` where status = '${param.status}'`
        : '';
      const bookings = (await fetchModel(
        `SELECT bookings.* , cabins.name as 'cabinName',cabins.regularPrice as 'cabinPrice' , guests.fullName as 'guestName',guests.email FROM Bookings
         inner join cabins on cabins.id = bookings.cabinId
          inner join guests on guests.id = bookings.guestId
          ${status} ` + Query.paramQuery(param)
      )) as IBooking[];

      return bookings;
    } catch (error) {
      throw error;
    }
  }
  static async getFilteredCount(param: IParamQuery) {
    try {
      const status: string = param.status
        ? ` where status = '${param.status}'`
        : '';
      const count = await fetchModel<
        {
          count: number;
        }[]
      >(`SELECT Count(*) as 'count' FROM Bookings
         inner join cabins on cabins.id = bookings.cabinId
          inner join guests on guests.id = bookings.guestId
          ${status} `);
      return count[0].count;
    } catch (error) {
      throw error;
    }
  }
  static async totalBookings(): Promise<number> {
    try {
      const bookings = await fetchModel<IBooking[]>('SELECT * FROM Bookings ');
      return bookings.length;
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

  static async getFormatBookingById(
    bookingId: number
  ): Promise<IFormatBooking | null> {
    try {
      const booking = await fetchModel<IBooking[]>(
        'SELECT * FROM BOOKINGS WHERE ID = ' + bookingId
      );
      if (!booking) throw new Error('No such booking');
      const cabin = fetchModel<ICabin[]>(
        'Select * from cabins where id = ' + booking[0].cabinId
      );
      const guest = fetchModel<IGuest[]>(
        'Select * from guests where id = ' + booking[0].guestId
      );
      const order = fetchModel<IOrder[]>(
        'Select * from orders where bookingId = ' + booking[0].id
      );
      const result = await Promise.all([cabin, guest, order]);
      const items = result[2].map((o) => {
        return fetchModel<Iitem[]>(
          'Select items.* from items inner join orderItems oi on oi.itemId = items.itemId where orderId = ' +
            o.id
        );
      });
      const orderItem = await Promise.all(items);
      const orders = orderItem.map((oi, index) => {
        return {
          order: result[2][index],
          items: [...oi],
        };
      });
      return {
        bookings: booking[0],
        orders,
        cabin: result[0][0],
        guest: result[1][0],
      };
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
  static async getBookingByGuestId(
    guestId: number
  ): Promise<IBooking[] | null> {
    try {
      const booking = await fetchModel<IBooking[]>(
        'SELECT * FROM BOOKINGS WHERE guestId = ' + guestId
      );
      if (!booking) throw new Error('No such booking');
      return booking;
    } catch (error) {
      throw error;
    }
  }
  static async updateBooking(bookingId: number, data: Partial<IBooking>) {
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
  static async getBookingDatesByGuestId(guestId: number) {
    try {
      let query = `SELECT id, startDate , endDate FROM BOOKINGS WHERE guestId = ${guestId}`;
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
