import { Ideal, Iitem } from '../Interface/interface';
import { fetchModel, addModel, updateModel, deleteModel } from './genericRepo';
import { Query } from '../utils/query';

export class dealRepo {
  static async getAllDeals() {
    try {
      const deals = (await fetchModel(
        'select * from deals inner join items on deals.itemId = items.itemId'
      )) as {
        dealID: number;
        itemId: number;
        price: number;
        name: string;
        picture: string;
      }[];

      let dealIds: number[] = [];
      for (let i = 0; i < deals.length; i++) {
        dealIds.push(deals[i].dealID);
      }
      const uniqueDealId = new Set(dealIds);

      const _deal = [...uniqueDealId].map((id) => {
        let it: Iitem[] = [];
        for (let i = 0; i < deals.length; i++) {
          if (deals[i].dealID === id) {
            it.push({
              id: deals[i].itemId,
              picture: deals[i].picture,
              name: deals[i].name,
              price: deals[i].price,
            });
          }
        }
        return { dealId: id, items: it };
      });
      console.log([...uniqueDealId]);
      console.log(deals);
      return _deal;
    } catch (error) {
      throw error;
    }
  }
  static async getDealsById(dealId: number) {
    try {
      return (await fetchModel(
        'SELECT items.itemId , items.name , items.picture , items.price  FROM deals inner join items on deals.itemId = items.itemId where deals.dealId = ' +
          dealId
      )) as Iitem[];
    } catch (error) {
      throw error;
    }
  }
  static async addItem(deal: Ideal) {
    try {
      await addModel(`Insert into items values(${deal.dealId},${deal.itemId})`);
    } catch (error) {
      throw error;
    }
  }
  static async updateDeals(dealId: number, data: any) {
    try {
      await updateModel(Query.updateById(dealId, 'deals', data));
    } catch (error) {
      throw error;
    }
  }
  static async deleteDeals(dealId: number) {
    try {
      await deleteModel(Query.deleteById(dealId, 'deals'));
    } catch (error) {
      throw error;
    }
  }
}
