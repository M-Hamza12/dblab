import express from 'express';
import { validateCabin } from '../validations/addCabin.validation';
import { validateUpdateCabin } from '../validations/updateCabin';
import { CabinController } from '../controller/cabinController';

const router = express.Router();
// / with post means create where as / with get means find all
router.route('/').post(validateCabin, CabinController.addCabin);
router.route('/').get(CabinController.findAllCabins);
router.route('/:id').patch(validateUpdateCabin, CabinController.updateCabin);
router.route('/:id').delete(CabinController.deleteCabin);
router.route('/get-future-booking/:id').get(CabinController.getFutureBookings);

export default router;
