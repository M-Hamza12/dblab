import { Iitem } from '../Interface/interface';
import { fetchModel, addModel, updateModel, deleteModel } from './genericRepo';
import { Query } from '../utils/query';

const query = new Query();

export class itemRepo {
  static async getAllItems() {
    try {
      return (await fetchModel('SELECT * FROM ITEMS')) as Iitem[];
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
      await updateModel(Query.updateById(itemId, 'items', data));
    } catch (error) {
      throw error;
    }
  }
  static async deleteItem(itemId: number) {
    try {
      await deleteModel(Query.deleteById(itemId, 'items'));
    } catch (error) {
      throw error;
    }
  }
}
