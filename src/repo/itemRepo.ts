import { IParamQuery, Iitem } from '../Interface/interface';
import { fetchModel, addModel, updateModel, deleteModel } from './genericRepo';
import { Query } from '../utils/query';
import { param } from 'express-validator';

const query = new Query();

export class itemRepo {
  static async getAllItems(param: IParamQuery) {
    try {
      console.log('items ', param);
      return (await fetchModel(
        'SELECT * FROM ITEMS ' + Query.paramQuery(param)
      )) as Iitem[];
    } catch (error) {
      throw error;
    }
  }
  static async getCount() {
    try {
      return (await fetchModel<Iitem[]>('Select * from items')).length;
    } catch (error) {
      throw error;
    }
  }
  static async getItemById(itemId: number) {
    try {
      return await fetchModel<Iitem>(
        'Select * from items where itemId = ' + itemId
      );
    } catch (error) {
      throw error;
    }
  }
  static async addItem(item: Iitem) {
    try {
      await addModel(
        `Insert into items values(${item.id},${item.price},'${item.picture}','${item.name}')`
      );
    } catch (error) {
      throw error;
    }
  }
  static async updateItem(itemId: number, data: any) {
    try {
      await updateModel(Query.updateById(itemId, 'items', data, 'itemId'));
    } catch (error) {
      throw error;
    }
  }
  static async deleteItem(itemId: number) {
    try {
      await deleteModel('Delete from items where itemId = ' + itemId);
    } catch (error) {
      throw error;
    }
  }
}
