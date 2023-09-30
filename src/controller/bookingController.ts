import { IBooking } from '../Interface/interface';
import { Request, Response } from 'express';
import { BookingRepo } from '../repo/bookingRepo';

export class BookingController {
  static async Booking(req: Request, resp: Response) {
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
}
