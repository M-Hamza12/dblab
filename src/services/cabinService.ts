import { ICabin } from '../Interface/interface';
import { mySqlConnection } from '..';
import { fetchModel } from '../repo/genericRepo';
import { Response } from 'express';

export class CabinService {
  static addCabin(cabin: ICabin, res: Response) {
    const query = `INSERT INTO CABINS(id,createdAt,name,maxCapacity,regularPrice,discount,description,cabinImage)
                VALUES(${cabin.id},'${cabin.createdAt}','${cabin.name}'
                      ,${cabin.maxCapacity},${cabin.regularPrice},${cabin.discount},'${cabin.description}','${cabin.cabinImage}')`;
    mySqlConnection.query(query, (error, rows) => {
      try {
        if (error) throw error;
        res.status(201).json({
          status: 'success',
        });
      } catch (error) {
        res.status(404).json({
          status: 'fail',
          error,
        });
      }
    });
  }
  static async findAllCabins(): Promise<ICabin[] | null> {
    try {
      const cabins = (await fetchModel('SELECT * FROM Cabins')) as ICabin[];
      return cabins?.map(
        (cabin) =>
          ({
            id: cabin.id,
            createdAt: cabin.createdAt,
            name: cabin.name,
            maxCapacity: cabin.maxCapacity,
            regularPrice: cabin.regularPrice,
            discount: cabin.discount,
            description: cabin.description,
            cabinImage: cabin.cabinImage,
          } as ICabin)
      );
    } catch (error) {
      throw error;
    }
  }
}
