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
  body('hasBreakFast').isBoolean().withMessage('enter boolean value'),
  body('isPaid').isBoolean().withMessage('enter boolean value'),
  // body('observation').isBoolean().withMessage('enter boolean value'),
  body('cabinId').isNumeric().withMessage('enter numeric value'),
  body('guestId').isNumeric().withMessage('enter numeric value'),
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
