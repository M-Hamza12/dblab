import express from 'express';
import { itemController } from '../controller/itemController';
const router = express.Router();

router.route('/').get(itemController.getAllItems);
router.route('/').post(itemController.addItem);

router.route('/:id').delete(itemController.deleteItem);
router.route('/:id').patch(itemController.updateItem);

export default router;
