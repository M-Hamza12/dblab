import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { refactorErrorMessage } from '../utils/error';

export const validateAdminLogin = [
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password should be 8 character long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = refactorErrorMessage(errors);
      return res.status(400).json({ status: 'fail', errors: error });
    }
    next();
  },
];
