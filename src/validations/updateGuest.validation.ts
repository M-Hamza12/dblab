import { NextFunction, Request, Response } from 'express';
import { refactorErrorMessage } from '../utils/error';
import { body, validationResult } from 'express-validator';

export const validateUpdateGuest = [
  body('id').isEmpty().withMessage('Id cant be updated'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = refactorErrorMessage(errors);
      return res.status(400).json({ errors: error });
    }
    next();
  },
];
