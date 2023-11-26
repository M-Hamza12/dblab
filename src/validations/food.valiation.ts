import { header, body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

import { AuthController } from '../controller/authController';
import { refactorErrorMessage } from '../utils/error';

export const validateFood = [
  body('name')
    .notEmpty()
    .withMessage('food must have a name')
    .isString()
    .withMessage('food name must be a string'),
  body('image').notEmpty().withMessage('image url is required'),
  body('price')
    .notEmpty()
    .withMessage('food price is required')
    .isNumeric()
    .withMessage('Price must be a number'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = refactorErrorMessage(errors);
      return res.status(400).json({ errors: error });
    }
    next();
  },
];
