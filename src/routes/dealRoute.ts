import express from 'express';
import { dealController } from '../controller/dealController';

const router = express.Router();

router.route('/').get(dealController.getAllDeals);

export default router;
