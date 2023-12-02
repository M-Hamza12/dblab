import express from 'express';
import { validateCabin } from '../validations/addCabin.validation';
import { validateUpdateCabin } from '../validations/updateCabin';
import { CabinController } from '../controller/cabinController';
import { Request, Response, NextFunction } from 'express';

const middleware = function (req: Request, res: Response, next: NextFunction) {
  if (!req.params.sortBy) req.params.sortBy = 'createdAt-desc';
  //default features
  if (!req.body.features || req.body.features.length === 0)
    req.body.features = [1, 2, 3];
  next();
};

const router = express.Router();
// / with post means create where as / with get means find all
router.route('/').post(validateCabin, CabinController.addCabin);
router.route('/').get(middleware, CabinController.findAllCabins);
router.route('/:id').get(CabinController.findCabinById);
router.route('/:id').patch(validateUpdateCabin, CabinController.updateCabin);
router.route('/:id').delete(CabinController.deleteCabin);
router.route('/get-future-booking/:id').get(CabinController.getFutureBookings);

export default router;
