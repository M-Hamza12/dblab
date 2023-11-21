import { addModel, fetchModel } from './genericRepo';
import { Query } from '../utils/query';
import { Response } from 'express';

let query = new Query();
export class featuresRepo {
  static async createMany(features: [], resp: Response) {
    // patt
    // `INSERT into cabinfeatures(featureName) VALUES ('test1') , ('test2'); `;
    try {
      const queries = features.map(
        (feature) => `INSERT into features(featureName) VALUES ('${feature}')`
      );
      const promises = queries.map((query) => addModel(query));
      return await Promise.all(promises);
    } catch (error) {
      throw error;
    }
  }
  static async getAllFeatures() {
    try {
      const features = await fetchModel('SELECT * FROM features');
      return features;
    } catch (error) {
      throw error;
    }
  }
}
