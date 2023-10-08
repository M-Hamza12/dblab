import { BookingRepo } from '../repo/bookingRepo';
export class BookingService {
  static async isValidDate(
    startDate: Date,
    endDate: Date,
    cabinId: number
  ): Promise<boolean> {
    try {
      console.log('validating dates');
      const bookings = await BookingRepo.getBookingByCabinId(cabinId);
      if (!bookings) return true;
      if (bookings.length === 0) return true;
      for (const b of bookings) {
        if (
          new Date(startDate) >= b.startDate &&
          new Date(startDate) <= b.endDate
        )
          return false;
        if (new Date(endDate) >= b.startDate && new Date(endDate) <= b.endDate)
          return false;
      }
      console.log('valid');
      return true;
    } catch (error) {
      throw error;
    }
  }
  static async isValidUpdateDate(
    startDate: Date,
    endDate: Date,
    cabinId: number,
    bookingId: number
  ) {
    try {
      console.log('validating dates');
      const bookings = await BookingRepo.getBookingByCabinId(cabinId);
      if (!bookings) return true;
      if (bookings.length === 0) return true;
      for (const b of bookings) {
        if (b.id === bookingId) continue;
        if (
          new Date(startDate) >= b.startDate &&
          new Date(startDate) <= b.endDate
        )
          return false;
        if (new Date(endDate) >= b.startDate && new Date(endDate) <= b.endDate)
          return false;
      }
      console.log('valid');
      return true;
    } catch (error) {
      throw error;
    }
  }
}
