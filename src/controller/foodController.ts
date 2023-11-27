import { IFood } from '../Interface/interface';
import { FoodRepo } from '../repo/foodRepo';
import { Request, Response } from 'express';
import generateUniqueId from 'generate-unique-id';
export class FoodController {
  static async getFood(req: Request, resp: Response) {
    try {
      const foods = await FoodRepo.getFood(req.params);
      const count = await FoodRepo.getCount();
      resp.status(200).json({
        status: 'success',
        count,
        foods,
      });
    } catch (error) {
      resp.status(404).json({
        status: 'fail',
        error,
      });
    }
  }
  static async createFood(req: Request, resp: Response) {
    try {
      const food = req.body as IFood;
      food.id = +generateUniqueId({
        useLetters: false,
        useNumbers: true,
        length: 10,
      });
      await FoodRepo.addFood(food as IFood);
      resp.status(200).json({
        status: 'sucess',
      });
    } catch (error) {
      resp.status(404).json({
        status: 'fail',
        error,
      });
    }
  }
  static async deleteFood(req: Request, resp: Response) {
    try {
      const foodId: number = req.body.id;
      await FoodRepo.deleteFood(foodId);
      resp.status(203).json({
        status: 'succes',
      });
    } catch (error) {
      resp.status(404).json({
        status: 'fail',
        error,
      });
    }
  }
}
