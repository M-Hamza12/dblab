import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateCabin = [
  body('name').notEmpty().withMessage('Cabin must have a name'),
  body('maxCapacity')
    .notEmpty()
    .withMessage('Max capacity is required')
    .isNumeric()
    .withMessage('Max capacity must be a number'),
  body('discount')
    .notEmpty()
    .withMessage('Discount is required')
    .isNumeric()
    .withMessage('Discount must be a number'),
  body('regularPrice')
    .notEmpty()
    .withMessage('Regular Price is required')
    .isNumeric()
    .withMessage('Regular price must be a number'),
  body('description').notEmpty().withMessage('Description is required'),
  body('cabinImage').notEmpty().withMessage('Cabin images are required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    console.log('body ', req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
