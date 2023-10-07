import { IBooking } from '../Interface/interface';
import { Request, Response } from 'express';
import { BookingRepo } from '../repo/bookingRepo';

export class BookingController {
  static async addBooking(req: Request, resp: Response) {
    try {
      const booking = req.body as IBooking;

      //fetching cabin and guest from the db
      const guest = await BookingRepo.fetchGuest(booking.guestId);
      const cabin = await BookingRepo.fetchCabin(booking.cabinId);

      //if guest is not in db
      if (!guest)
        throw new Error('Guest is not found.Please register your self');
      //if it is an invalid cabin
      if (!cabin) throw new Error('Invalid Cabin');

      // check if cabin is available

      const breakFast = 100;

      //if there is breakfast
      booking.extrasPrice = booking.hasBreakFast ? breakFast : 0;

      booking.totalPrice = booking.cabinPrice + booking.extrasPrice;

      //if all is good
      BookingRepo.addBooking(booking, resp);
    } catch (error) {
      console.log('error');
      let message: string = '';
      if (error instanceof Error) message = error.message;
      resp.status(404).json({
        message,
      });
    }
  }
  static async getAllBookings(req: Request, resp: Response) {
    try {
      const allBookings = await BookingRepo.getAllBookings(req.params);
      if (!allBookings) throw new Error('no booking');
      resp.status(200).json({
        status: 'success',
        count: allBookings.length,
        bookings: allBookings,
      });
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        error,
      });
    }
  }
  static async getBookingById(req: Request, resp: Response) {
    try {
      const booking = await BookingRepo.getBookingById(+req.params.id);
      resp.status(200).json({
        status: 'success',
        booking,
      });
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        error,
      });
    }
  }
  static async deleteBooking(req: Request, resp: Response) {
    try {
      const message = BookingRepo.deleteBooking(+req.params.id);
      resp.status(404).json({
        status: 'success',
        message,
      });
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        error: error instanceof Error ? error.message : 'something went wrong',
      });
    }
  }
}
