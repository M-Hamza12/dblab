import { header, body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

import { AuthController } from '../controller/authController';
import { refactorErrorMessage } from '../utils/error';

export const validateBooking = [
  // header('authorization').notEmpty().withMessage('invalid authorization'),
  // AuthController.protect,
  //data validation

  body('startDate').isISO8601().withMessage('enter date value'),
  body('endDate').isISO8601().withMessage('enter date value'),
  body('numNights')
    .notEmpty()
    .withMessage('numNights is required')
    .isInt({ gt: 0 })
    .withMessage('nights should be atleast 1'),

  // body('cabinPrice').isInt({ gt: 0 }),
  // body('extrasPrice').isNumeric().withMessage('enter numeric value'),
  // body('totalPrice').isNumeric().withMessage('enter numeric value'),
  body('status').notEmpty(),

  body('isPaid').isBoolean().withMessage('isPaid is boolean value'),
  // body('observation').isBoolean().withMessage('enter boolean value'),
  body('cabinId')
    .notEmpty()
    .withMessage('cabinId is required')
    .isNumeric()
    .withMessage('cabinId is numeric value'),
  body('description').notEmpty().withMessage('description is required'),
  body('guestId')
    .notEmpty()
    .withMessage('guestId is required')
    .isNumeric()
    .withMessage('guestId numeric value'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = refactorErrorMessage(errors);
      return res.status(400).json({ errors: error });
    }
    next();
  },
];
