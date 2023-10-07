import express from 'express';

import { validateBooking } from '../validations/bookin.validation';
import { BookingController } from '../controller/bookingController';

const router = express.Router();

router.route('/booking').post(validateBooking, BookingController.Booking);

export default router;
