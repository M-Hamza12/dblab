import { header, body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

import { AuthController } from '../controller/authController';
import { refactorErrorMessage } from '../utils/error';

export const validateBooking = [
  // header('authorization').notEmpty().withMessage('invalid authorization'),
  // AuthController.protect,
  //data validation

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
  // body('cabinPrice').isInt({ gt: 0 }),
  // body('extrasPrice').isNumeric().withMessage('enter numeric value'),
  // body('totalPrice').isNumeric().withMessage('enter numeric value'),
  body('status').notEmpty(),
  body('hasBreakFast')
    .notEmpty()
    .withMessage('hasBreakfast is required')
    .isBoolean()
    .withMessage('hasBreakfast is  boolean value'),
  body('isPaid').isBoolean().withMessage('isPaid is boolean value'),
  // body('observation').isBoolean().withMessage('enter boolean value'),
  body('cabinId')
    .notEmpty()
    .withMessage('cabinId is required')
    .isNumeric()
    .withMessage('cabinId is numeric value'),
  body('guestId')
    .notEmpty()
    .withMessage('guestId is required')
    .isNumeric()
    .withMessage('guestId numeric value'),
  body('hasSmoking')
    .notEmpty()
    .withMessage('hasSmoking is required')
    .isBoolean()
    .withMessage('hasSmoking is boolean value'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    console.log('body ', req.body);
    if (!errors.isEmpty()) {
      const error = refactorErrorMessage(errors);
      return res.status(400).json({ errors: error });
    }
    next();
  },
];
