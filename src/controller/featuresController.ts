import { Request, Response } from 'express';
import { featuresRepo } from '../repo/featuresRepo';

export class FeaturesController {
  static async addFeatures(req: Request, resp: Response) {
    try {
      const { features } = req.body;
      const res = await featuresRepo.createMany(features, resp);
      console.log('features', features);
      resp.status(201).json({
        status: 'success',
        message: 'features added successfully',
      });
    } catch (error) {
      let message =
        error instanceof Error ? error.message : 'something went wrong';
      resp.status(400).json({
        status: 'fail',
        error: message,
      });
    }
  }
  static async getAllFeatures(req: Request, resp: Response) {
    try {
      const res = await featuresRepo.getAllFeatures();
      resp.status(200).json({
        status: 'success',
        res,
      });
    } catch (error) {
      let message =
        error instanceof Error ? error.message : 'something went wrong';
      resp.status(400).json({
        status: 'fail',
        error: message,
      });
    }
  }
}
