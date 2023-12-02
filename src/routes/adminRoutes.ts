import express from 'express';
import { adminController } from '../controller/adminController';
import { validateAdminLogin } from '../validations/adminLogin.validation';
import { validateAdminSignup } from '../validations/adminSingup.validation';

const router = express.Router();

router.route('/signup').post(validateAdminSignup, adminController.addAdmin);
router.route('/login').post(validateAdminLogin, adminController.adminLogin);

export default router;
