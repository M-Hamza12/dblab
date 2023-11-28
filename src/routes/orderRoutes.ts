import express from 'express';
import { OrderController } from '../controller/orderController';
const router = express.Router();

router.route('/').post(OrderController.addOrder);

export default router;
