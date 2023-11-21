import express from 'express';
import { FeaturesController } from '../controller/featuresController';

const router = express.Router();

router.route('/').post(FeaturesController.addFeatures);
router.route('/').get(FeaturesController.getAllFeatures);
export default router;
