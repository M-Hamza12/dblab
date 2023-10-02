import { NextFunction, Request, Response } from 'express';
import { refactorErrorMessage } from '../utils/error';
import { body, validationResult } from 'express-validator';

export const validateUpdateCabin = [
  body('id').isEmpty().withMessage('Id cant be updated'),
  body('createdAt').isEmpty().withMessage('createdAt cant be updated'),
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
