import { fetchModel, deleteModel, addModel } from './genericRepo';
import { IFood, IParamQuery } from './../Interface/interface';
import { Query } from '../utils/query';
export class FoodRepo {
  static async getCount() {
    try {
      const count: number = (await fetchModel<IFood[]>('Select * from foods'))
        .length;
      return count;
    } catch (error) {
      throw error;
    }
  }
  static async getFood(param: IParamQuery) {
    try {
      const foods = await fetchModel<IFood[]>(
        'SELECT * FROM FOODS ' + Query.paramQuery(param)
      );
      return foods;
    } catch (error) {
      throw error;
    }
  }
  static async addFood(food: IFood) {
    try {
      await addModel(
        `Insert into foods(id,name,price,image) values(${food.id},'${food.name}',${food.price},'${food.image}')`
      );
    } catch (error) {
      throw error;
    }
  }
  static async deleteFood(foodId: number) {
    try {
      await deleteModel('Delete from foods where id = ' + foodId);
    } catch (error) {
      throw error;
    }
  }
}
