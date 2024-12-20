import express from 'express';

import { validateBooking } from '../validations/bookin.validation';
import { BookingController } from '../controller/bookingController';

const router = express.Router();

router.route('/').get(BookingController.getAllBookings);
router.route('/').post(validateBooking, BookingController.addBooking);

router.route('/todayactivity').get(BookingController.getTodayActivity);

router.route('/:id').get(BookingController.getBookingById);
router.route('/:id').put(BookingController.updateBooking);
router.route('/:id').delete(BookingController.deleteBooking);
router.route('/guest/:id').get(BookingController.getBookingsByGuestId);
router
  .route('/guest/dates/:id')
  .get(BookingController.getBookingDatesByGuestId);
router.route('/today/:id').get(BookingController.hasBookingStartedToday);
router.route('/:id').patch(BookingController.updateBooking);
router.route('/pastbookings/:days').get(BookingController.pastDaysBooking);
router.route('/recentbookings/:days').get(BookingController.getRecentBookings);
router
  .route('/cabin/:cabinId/bookedDates')
  .get(BookingController.getBookingsByCabinId);

export default router;
