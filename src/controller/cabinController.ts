import { Request, Response } from 'express';
import { CabinPaginatedResponse, ICabin } from '../Interface/interface';
import generateUniqueId from 'generate-unique-id';
import { formatDate } from '../utils/date';
import { CabinRepo } from '../repo/cabinRepo';

export class CabinController {
  static addCabin(req: Request, resp: Response) {
    try {
      // todo : add permission service here
      const cabin = req.body as ICabin;
      // random id
      cabin.id = +generateUniqueId({
        useLetters: false,
        useNumbers: true,
        length: 10,
      });
      //YYYY-MM-DD
      cabin.createdAt = formatDate();

      //image logic should go here cabin.cabinImage = ....
      CabinRepo.addCabin(cabin, resp);
    } catch (error) {}
  }
  static async findAllCabins(req: Request, res: Response) {
    const cabins = await CabinRepo.findAllCabins();
    return res.status(200).json({
      count: cabins?.length,
      cabins,
    } as CabinPaginatedResponse);
  }

  static deleteCabin() {}
  static updateCabin() {} //anas
}
