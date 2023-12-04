import { IParamQuery, Iitem } from '../Interface/interface';
import {
  fetchModel,
  addModel,
  updateModel,
  deleteModel,
  beginTransaction,
  commit,
  rollback,
} from './genericRepo';
import { Query } from '../utils/query';
import { param } from 'express-validator';

const query = new Query();

export class itemRepo {
  static async getAllItems(param: IParamQuery) {
    try {
      console.log('items ', param);
      return (await fetchModel(
        'SELECT * FROM ITEMS where deleted = 0 or deleted = false ' +
          Query.paramQuery(param)
      )) as Iitem[];
    } catch (error) {
      throw error;
    }
  }
  static async getCount() {
    try {
      return (
        await fetchModel<Iitem[]>(
          'Select * from items where deleted = false or deleted = 0'
        )
      ).length;
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
      console.log('adding item ', item);
      await beginTransaction(); //beginTransaction
      await addModel(
        `Insert into items values(${item.id},${item.price},'${item.picture}','${item.name}',false)`
      );
      await commit(); // COMMIT
    } catch (error) {
      await rollback(); //ROllback
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
      const items = await fetchModel<Iitem[]>(
        'select * from orderItems where itemId = ' + itemId
      );
      if (items.length === 0) {
        //no order for this item so hard delete
        await deleteModel('Delete from items where itemId = ' + itemId);
        console.log('hard delete');
      } else {
        //there are some orders related to this hence soft delete
        await updateModel(
          'Update items set deleted = true where itemId = ' + itemId
        );
        console.log('soft delete');
      }
    } catch (error) {
      throw error;
    }
  }
}
