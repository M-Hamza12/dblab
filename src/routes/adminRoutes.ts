import express from 'express';
import { body, header } from 'express-validator';
import { addCabin, addGuest, Booking } from './../controller/adminController';
import { protect } from '../controller/authController';
const router = express.Router();

router.route('/addCabin').post(addCabin);
router.route('/addGuest').post(addGuest);
router.route('/booking').post(
  header('authorization').notEmpty().withMessage('invalid authorization'),
  protect,
  //data validation
  body('id')
    .notEmpty()
    .withMessage('id is required')
    .isNumeric()
    .withMessage('enter numeric value'),
  body('startDate').isDate().withMessage('enter date value'),
  body('endDate').isDate().withMessage('enter date value'),
  body('numNights')
    .notEmpty()
    .withMessage('numNights is required')
    .isInt({ gt: 0 })
    .withMessage('nights should be atleast 1'),
  body('numGuests')
    .notEmpty()
    .withMessage('numNights is required')
    .isInt({ gt: 0 })
    .withMessage('numNights should be greater than 0'),
  body('cabinPrice').isInt({ gt: 0 }),
  body('extrasPrice').isNumeric().withMessage('enter numeric value'),
  body('totalPrice').isNumeric().withMessage('enter numeric value'),
  body('status').notEmpty(),
  body('hasBreakFast').isBoolean().withMessage('enter boolean value'),
  body('isPaid').isBoolean().withMessage('enter boolean value'),
  body('observation').isBoolean().withMessage('enter boolean value'),
  body('cabinId').isNumeric().withMessage('enter numeric value'),
  body('guestId').isNumeric().withMessage('enter numeric value'),
  Booking
);
export default router;
