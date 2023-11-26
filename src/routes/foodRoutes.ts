import express from 'express';
import { validateFood } from '../validations/food.valiation';
import { FoodController } from '../controller/foodController';
const router = express.Router();

router.route('/').get(FoodController.getFood);
router.route('/').post(validateFood, FoodController.createFood);
router.route('/:id').get(FoodController.deleteFood);

export default router;
