import express from 'express';
const router = express.Router();
import { body } from 'express-validator';

import { getAllUser } from '../controller/userController';
import { login, signup } from '../controller/authController';

router.route('/').get(getAllUser);
router
  .route('/login')
  .post(
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
    login
  );
router
  .route('/signup')
  .post(
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('enter valid email'),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password should be 8 characters long'),
    body('confirmPassword')
      .notEmpty()
      .withMessage('confirmPassword is required')
      .isLength({ min: 8 })
      .withMessage('password should be 8 characters long'),
    signup
  );

export default router;
