import {
  ICabin,
  IParamQuery,
  IReadCabin,
  IFilters,
} from '../Interface/interface';
import { formatDate } from '../utils/date';
import { mySqlConnection } from '..';
import {
  fetchModel,
  updateModel,
  deleteModel,
  addModel,
  getFutureBookingProcedure,
} from '../repo/genericRepo';
import { Response } from 'express';
import { Query } from '../utils/query';

export class CabinRepo {
  static async addCabin(cabin: ICabin, res: Response) {
    try {
      console.log('calling');
      const query = `INSERT INTO CABINS(id,createdAt,name,maxCapacity,regularPrice,discount,description,cabinImage)
                VALUES(${cabin.id},'${cabin.createdAt}','${cabin.name}'
                      ,${cabin.maxCapacity},${cabin.regularPrice},${cabin.discount},'${cabin.description}','${cabin.cabinImage}')`;
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
  static async findAllCabins(
    param: IParamQuery,
    filters: IFilters
  ): Promise<ICabin[] | null> {
    try {
      let filterString = '';
      console.log(filters);

      if (filters && Object.keys(filters).length > 0) {
        filterString = ' where ';
        if (filters.discount && filters.discount === 'true') {
          filterString += ' c.discount>0 ';
        }
        if (filters.discount && filters.discount === 'false') {
          filterString += ' c.discount = 0 ';
        }
        if (filters.priceRange) {
          if (filterString !== ' where ') filterString += ' and ';
          filterString += `(c.regularPrice>= ${filters.priceRange.min} and c.regularPrice <= ${filters.priceRange.max})`;
        }
        if (filters.maxCapacity) {
          console.log('inside max cap');
          if (filterString !== ' where ') filterString += ' and (';
          filters.maxCapacity.forEach((m, i) => {
            if (i > 0) filterString += ' or ';
            filterString += `c.maxCapacity = ${m}`;
          });
          if (filters.priceRange) filterString += ')';
          else filterString += ' ';
          console.log('filter string from max cap', filterString);
        }
        if (filters?.features) {
          if (filterString !== ' where ') filterString += ' and ';
          filterString += ` c.id in (
    	select c2.id
        from cabins c2
        join cabinFeatures cf2 on cf2.cabinId = c2.id
        join features f2 on f2.id = cf2.featureId
        where f2.id in (${filters.features.join(',')})
        group by c2.id
        having count(f.id) >= ${filters.features.length}
    )`;
        }
        console.log(filterString);
      }
      const cabins = (await fetchModel(
        `SELECT c.id ,c.name,c.maxCapacity,c.regularPrice,c.discount,c.description,c.cabinImage,c.totalBookings,
          GROUP_CONCAT(f.featureName SEPARATOR ',') AS features
        FROM Cabins c
        JOIN CabinFeatures cf ON c.id = cf.cabinID
        JOIN features f ON cf.featureID = f.id
        ${filterString}
        GROUP BY c.id ,c.name,c.maxCapacity,c.regularPrice,c.discount,c.description,c.cabinImage,c.totalBookings` +
          Query.paramQuery(param)
      )) as IReadCabin[];
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
            totalBookings: cabin.totalBookings,
            features: cabin.features?.split(','),
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
      console.log('update cabin query ', query);
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
  static async getFutureDates(cabinId: number) {
    try {
      const bookingDates = await getFutureBookingProcedure(
        cabinId,
        formatDate()
      );
      console.log(bookingDates);
      return bookingDates;
    } catch (error) {
      throw error;
    }
  }
}
