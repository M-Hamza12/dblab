import { Request, Response } from 'express';
import {
  CabinPaginatedResponse,
  ICabin,
  IParamQuery,
} from '../Interface/interface';
import generateUniqueId from 'generate-unique-id';
import { formatDate } from '../utils/date';
import { CabinRepo } from '../repo/cabinRepo';

export class CabinController {
  static addCabin(req: Request, resp: Response) {
    try {
      // todo : add permission service here
      const cabin = req.body as ICabin;
      console.log('cabin ', cabin);
      // random id
      cabin.id = +generateUniqueId({
        useLetters: false,
        useNumbers: true,
        length: 10,
      });
      //YYYY-MM-DD
      cabin.createdAt = formatDate();
      const res = CabinRepo.addCabin(cabin, resp);
      resp.status(201).json({
        status: 'success',
      });
    } catch (error) {
      resp.status(404).json({
        status: 'fail',
        error,
      });
    }
  }
  static async findAllCabins(req: Request, res: Response) {
    console.log('req.query ', req.query);
    console.log('------------------------', Date.now());
    console.log('req. body ', req.body);
    const filters = JSON.parse((req?.query?.filters as string) ?? '{}');
    const { filters: _, ...query } = req.query;
    console.log('filters ', filters);
    const cabins = await CabinRepo.findAllCabins(query as IParamQuery, filters);
    console.log(' cabins ', cabins);
    const totalCount = await CabinRepo.getCabinsCount();

    return res.status(200).json({
      count: totalCount,
      cabins,
    } as CabinPaginatedResponse);
  }

  static async deleteCabin(req: Request, resp: Response) {
    try {
      const id = +req.params.id;
      await CabinRepo.deleteCabin(id, resp);

      resp.status(204).json({
        status: 'success',
      });
    } catch (error) {
      let message =
        error instanceof Error ? error.message : 'something went wrong';
      resp.status(400).json({
        status: 'fail',
        error: message,
      });
    }
  }
  static async updateCabin(req: Request, resp: Response) {
    try {
      const id = +req.params.id;
      await CabinRepo.updateCabin(id, req.body, resp);
      resp.status(200).json({
        status: 'success',
        message: 'updated successfully',
      });
    } catch (error) {
      let message =
        error instanceof Error ? error.message : 'something went wrong';
      resp.status(400).json({
        status: 'fail',
        error: message,
      });
    }
  }
  static async findCabinById(req: Request, resp: Response) {
    try {
      const id = +req.params.id;
      console.log('hehe');
      const cabin = await CabinRepo.fetchCabin(id);
      if (!cabin)
        return resp.status(404).json({
          status: 'fail',
          error: 'cabin not found',
        });
      return resp.status(200).json({
        status: 'success',
        cabin,
      });
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        error,
      });
    }
  }
  static async getFutureBookings(req: Request, resp: Response) {
    const id = +req.params.id;
    console.log('future id : ', id);
    try {
      const dates = await CabinRepo.getFutureDates(id);
      resp.status(200).json({
        status: 'success',
        dates,
      });
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        error,
      });
    }
  }
}
