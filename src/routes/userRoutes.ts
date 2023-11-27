import express from 'express';

import { getAllUser } from '../controller/userController';
import { AuthController } from '../controller/authController';
import { validateLogin } from '../validations/login.validation';
import { validateSignup } from '../validations/signup.validation';

const router = express.Router();

router.route('/').get(getAllUser);
router.route('/login').post(validateLogin, AuthController.login);
router.route('/guest/login').post(validateLogin, AuthController.login);
router.route('/guest/signup').post(
  validateSignup,
  AuthController.signup //login
);
router.route('/signup').post(
  validateSignup,
  AuthController.signup //login
);

export default router;
