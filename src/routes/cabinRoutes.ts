import express from 'express';
import { validateCabin } from '../validations/addCabin.validation';
import { CabinController } from '../controller/cabinController';

const router = express.Router();
// / with post means create where as / with get means find all
router.route('/').post(validateCabin, CabinController.addCabin);
router.route('/').get(CabinController.findAllCabins);

export default router;
