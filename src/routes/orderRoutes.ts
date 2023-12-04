import express from 'express';
import { OrderController } from '../controller/orderController';
const router = express.Router();

router.route('/').post(OrderController.addOrder);
router.route('/:id').get(OrderController.fetchOrders);
router.route('/guest/:id').get(OrderController.fetchOrdersByGuestId);

export default router;
