import { deflateSync } from 'zlib';
import { Ideal, Iitem } from '../Interface/interface';
import { dealRepo } from './../repo/dealRepo';
import { Request, Response } from 'express';
export class dealController {
  static async getAllDeals(req: Request, resp: Response) {
    try {
      const deals = await dealRepo.getAllDeals();
      resp.status(200).json({
        status: 'success',
        result: deals.length,
        deals,
      });
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        error,
      });
    }
  }
  static async addDeal(req: Request, resp: Response) {
    try {
      const deal = req.body as Ideal;

      await dealRepo.addItem(deal);
      resp.status(200).json({
        status: 'success',
      });
    } catch (error) {
      resp.status(403).json({
        status: 'fail',
        error,
      });
    }
  }
  static async getDealById(req: Request, resp: Response) {
    try {
      const deals = await dealRepo.getDealsById(+req.params.id);
      resp.status(200).json({
        status: 'sucess',
        deals,
      });
    } catch (error) {
      resp.status(403).json({
        status: 'fail',
        error,
      });
    }
  }
  static async deleteDeal(req: Request, resp: Response) {
    try {
      const id = +req.params.id;
      await dealRepo.deleteDeals(id);
      resp.status(204);
    } catch (error) {
      resp.status(403).json({
        status: 'fail',
        error,
      });
    }
  }
  static async updateDeal(req: Request, resp: Response) {
    try {
      const id = +req.params.id;
      await dealRepo.updateDeals(id, req.body);
    } catch (error) {
      resp.status(403).json({
        status: 'fail',
        error,
      });
    }
  }
}
