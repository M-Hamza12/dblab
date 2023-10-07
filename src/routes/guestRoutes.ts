import express from 'express';

import { validateAddGuest } from '../validations/addGuest.validation';
import { GuestController } from '../controller/guestController';

const router = express.Router();

router.route('/').post(validateAddGuest, GuestController.addGuest);

export default router;
