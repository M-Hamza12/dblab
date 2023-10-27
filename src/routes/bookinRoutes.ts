import express from 'express';

import { validateBooking } from '../validations/bookin.validation';
import { BookingController } from '../controller/bookingController';

const router = express.Router();

router.route('/').get(BookingController.getAllBookings);
router.route('/').post(validateBooking, BookingController.addBooking);

router.route('/todayactivity').get(BookingController.getTodayActivity);

router.route('/:id').get(BookingController.getBookingById);
router.route('/:id').patch(BookingController.updateBooking);

router.route('/pastbookings/:days').get(BookingController.pastDaysBooking);

export default router;
