import express from 'express';
import { FeaturesController } from '../controller/featuresController';
import { validateUpdateFeature } from '../validations/updateFeature.validation';
const router = express.Router();

router.route('/').post(FeaturesController.addFeatures);
router.route('/').get(FeaturesController.getAllFeatures);

router
  .route('/:id')
  .patch(validateUpdateFeature, FeaturesController.updateFeature);
export default router;
