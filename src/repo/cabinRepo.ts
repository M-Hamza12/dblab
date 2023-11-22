import { ICabin, IParamQuery } from '../Interface/interface';
import { mySqlConnection } from '..';
import {
  fetchModel,
  updateModel,
  deleteModel,
  addModel,
} from '../repo/genericRepo';
import { Response } from 'express';
import { Query } from '../utils/query';

export class CabinRepo {
  static async addCabin(cabin: ICabin, res: Response) {
    try {
      const query = `INSERT INTO CABINS(id,createdAt,name,maxCapacity,regularPrice,discount,description,cabinImage,isAnimalFriendly)
                VALUES(${cabin.id},'${cabin.createdAt}','${cabin.name}'
                      ,${cabin.maxCapacity},${cabin.regularPrice},${cabin.discount},'${cabin.description}','${cabin.cabinImage}','${cabin.isAnimalFriendly}'}')`;
      const res = await addModel(query);
      const { features } = cabin;
      if (features && features?.length > 0) {
        const queries = features.map(
          (feature) =>
            `INSERT into cabinfeatures(cabinID,featureID) VALUES (${cabin.id},${feature})`
        );
        const promises = queries.map((query) => addModel(query));
        await Promise.all(promises);
      }
      return res;
    } catch (error) {
      throw error;
    }
  }
  // todo add total bookings on cabin
  static async findAllCabins(param: IParamQuery): Promise<ICabin[] | null> {
    try {
      const cabins = (await fetchModel(
        'SELECT * FROM Cabins' + Query.paramQuery(param)
      )) as ICabin[];
      return cabins?.map(
        (cabin) =>
          ({
            id: cabin.id,
            name: cabin.name,
            maxCapacity: cabin.maxCapacity,
            regularPrice: cabin.regularPrice,
            discount: cabin.discount,
            description: cabin.description,
            cabinImage: cabin.cabinImage,
            isAnimalFriendly: cabin.isAnimalFriendly,
            totalBookings: cabin.totalBookings,
          } as ICabin)
      );
    } catch (error) {
      throw error;
    }
  }
  static async getCabinsCount(): Promise<number> {
    const cabins = await fetchModel<ICabin[]>('SELECT * FROM CABINS');
    return cabins.length;
  }
  static async fetchCabin(cabinId: number): Promise<ICabin | null> {
    try {
      const cabin = await fetchModel<ICabin[]>(
        'SELECT * FROM Cabins WHERE id=' + cabinId
      );
      return cabin[0];
    } catch (error) {
      return null;
    }
  }
  static async updateCabin(cabinId: number, data: any, resp: Response) {
    try {
      const query = Query.updateById(cabinId, 'cabins', data);

      await updateModel(query);
    } catch (error) {
      throw error;
    }
  }
  static async deleteCabin(cabinId: number, resp: Response) {
    try {
      let query = Query.deleteById(cabinId, 'CABINS');
      await deleteModel(query);
    } catch (error) {
      throw error;
    }
  }
}
