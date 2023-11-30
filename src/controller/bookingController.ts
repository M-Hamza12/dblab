import { IBooking, IUpdateBooking } from '../Interface/interface';
import { Request, Response } from 'express';
import { BookingRepo } from '../repo/bookingRepo';
import { BookingService } from '../services/bookingService';
import generateUniqueId from 'generate-unique-id';

interface BookingDate {
  startDate: string;
  endDate: string;
  id: number;
}
const getBookingIdIfToday = (dates: BookingDate[]) => {
  const today = new Date();

  for (const { id, startDate, endDate } of dates) {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    // Check if today is between start date and end date (inclusive)
    if (today >= sDate && today <= eDate) {
      return id;
    }
  }
  return null;
};
export class BookingController {
  static async addBooking(req: Request, resp: Response) {
    try {
      const booking = req.body as IBooking;

      booking.id = +generateUniqueId({
        length: 10,
        useLetters: false,
        useNumbers: true,
      });

      //fetching cabin and guest from the db
      const guest = await BookingRepo.fetchGuest(booking.guestId);
      const cabin = await BookingRepo.fetchCabin(booking.cabinId);

      //if guest is not in db
      if (!guest)
        throw new Error('Guest is not found.Please register your self');
      //if it is an invalid cabin
      if (!cabin) throw new Error('Invalid Cabin');

      // check if cabin is available
      // console.log(cabin.regularPrice);
      booking.cabinPrice = cabin.regularPrice;
      //if there is breakfast
      booking.extrasPrice = booking.hasBreakFast ? 100 : 0;

      booking.totalPrice = booking.cabinPrice + booking.extrasPrice;
      console.log('booking : ', booking);
      //checking if there are no conflicts wihin dates
      // YYYY-MM-DD
      if (
        !(await BookingService.isValidDate(
          booking.startDate,
          booking.endDate,
          cabin.id
        ))
      )
        return resp.status(400).json({
          status: 'fail',
          message: 'There is already bookings within same date',
        });
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
  static async getBookingsByGuestId(req: Request, resp: Response) {
    try {
      const bookings = await BookingRepo.getBookingByGuestId(+req.params.id);
      // console.log(bookings);
      resp.status(200).json({
        status: 'success',
        bookings,
      });
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        error,
      });
    }
  }
  static async getBookingsByCabinId(req: Request, resp: Response) {
    try {
      const bookings = await BookingRepo.getBookingsByCabinId(
        +req.params.cabinId
      );
      // console.log(bookings);
      resp.status(200).json({
        status: 'success',
        bookings,
      });
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        error,
      });
    }
  }
  static async getAllBookings(req: Request, resp: Response) {
    try {
      const allBookings = await BookingRepo.getAllBookings(req.query);
      const totalCount = await BookingRepo.totalBookings();

      if (!allBookings) throw new Error('no booking');
      resp.status(200).json({
        status: 'success',
        count: totalCount, // total Bookings
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
      // always use return when you are sending reponse otherwise it will throw error
      // if some other code tries to send response
      // [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
      return resp.status(200).json({
        status: 'success',
        booking,
      });
    } catch (error) {
      return resp.status(400).json({
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
  static async updateBooking(req: Request, resp: Response) {
    try {
      const id = +req.params.id;
      const data = req.body as IUpdateBooking;
      console.log('_body ', req.body);

      //If you are altering the date or maybe booking other cabin than hv to check dates
      if (data.startDate && data.endDate && data.cabinId) {
        if (
          !(await BookingService.isValidUpdateDate(
            data.startDate,
            data.endDate,
            data.cabinId,
            id
          ))
        )
          throw new Error('Confilicting dates for the given cabin and date');

        // data.totalPrice = data.cabinPrice + data.extrasPrice
        await BookingRepo.updateBooking(id, req.body);
        return resp.status(200).json({
          status: 'success',
        });
      } else if (!data.startDate && !data.endDate && !data.cabinId) {
        data.extrasPrice = data.hasBreakFast ? 100 : 0;

        // data.totalPrice = data.cabinPrice + data.extrasPrice
        await BookingRepo.updateBooking(id, req.body);
        resp.status(200).json({
          status: 'success',
        });
      } else
        throw new Error('Provide both start and end date along with cabinId');
    } catch (error) {
      console.log('error', error);
      resp.status(400).json({
        status: 'fail',
        error: error instanceof Error ? error.message : 'something went wrong',
      });
    }
  }
  static async pastDaysBooking(req: Request, resp: Response) {
    try {
      const days = +req.params.days;
      const bookings = await BookingRepo.getBookingOfPastDays(days);
      resp.status(200).json({
        status: 'success',
        result: bookings.length,
        bookings,
      });
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        error,
      });
    }
  }
  static async getTodayActivity(req: Request, resp: Response) {
    try {
      console.log('hit activity');
      const bookings = await BookingRepo.getTodayActivity();
      resp.status(200).json({
        status: 'succes',
        result: bookings.length,
        bookings,
      });
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        error,
      });
    }
  }
  static async getBookingDatesByGuestId(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      console.log('guestId ', id);
      if (!id) {
        return resp.status(400).json({
          status: 'fail',
          error: {
            message: 'Please provide guest id',
          },
        });
      }
      const dates = await BookingRepo.getBookingDatesByGuestId(+id);
      return resp.status(200).json({
        status: 'success',
        dates,
      });
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        error,
      });
    }
  }
  static async hasBookingStartedToday(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      console.log('id ', id);
      if (!id) {
        return resp.status(400).json({
          status: 'fail',
          error: {
            message: 'Please provide guest id',
          },
        });
      }
      const dates = await BookingRepo.getBookingDatesByGuestId(+id);
      if (!dates.length)
        return resp.status(200).json({
          status: 'success',
          isBookingToday: false,
        });
      const isBookingToday = getBookingIdIfToday(
        dates as unknown as BookingDate[]
      );
      if (!isBookingToday) {
        return resp.status(200).json({
          status: 'success',
          isBookingToday: false,
          booking: null,
        });
      }
      const booking = await BookingRepo.getBookingById(isBookingToday);
      return resp.status(200).json({
        status: 'success',
        isBookingToday: true,
        booking,
      });
    } catch (error) {
      console.log('error today ', error);
      resp.status(400).json({
        status: 'fail',
        error,
      });
    }
  }
}
