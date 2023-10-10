import express from 'express';

import { validateAddGuest } from '../validations/addGuest.validation';
import { GuestController } from '../controller/guestController';

const router = express.Router();

router.route('/').post(validateAddGuest, GuestController.addGuest);
router.route('/').get(validateAddGuest, GuestController.getAllGuests);

router.route('/:id').get(validateAddGuest, GuestController.getGuestById);
router.route('/:id').patch(validateAddGuest, GuestController.updateGuest);
router.route('/:id').delete(validateAddGuest, GuestController.deleteGuest);

export default router;
