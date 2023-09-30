import { NextFunction, Request, Response } from 'express';
import { refactorErrorMessage } from '../utils/error';
import { body, validationResult } from 'express-validator';

export const validateAddGuest = [
  body('fullName').notEmpty().withMessage('fullName is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email'),
  body('nationalId').notEmpty().withMessage('nationalId is required'),
  body('countryFlag').notEmpty().withMessage('country Flag is required'),
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
