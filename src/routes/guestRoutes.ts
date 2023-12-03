import express from 'express';

import { validateAddGuest } from '../validations/addGuest.validation';
import { validateUpdateGuest } from '../validations/updateGuest.validation';
import { GuestController } from '../controller/guestController';

const router = express.Router();

router.route('/').post(validateAddGuest, GuestController.addGuest);
router.route('/').get(GuestController.getAllGuests);
router.route('/spending').get(GuestController.fetchAllGuestWithSpending);

router.route('/:id').get(GuestController.getGuestById);
router.route('/:id').patch(validateUpdateGuest, GuestController.updateGuest);
router.route('/:id').delete(GuestController.deleteGuest);

export default router;
