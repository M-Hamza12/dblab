import { Iitem } from '../Interface/interface';
import { itemRepo } from '../repo/itemRepo';
import { Request, Response } from 'express';
import generateUniqueId from 'generate-unique-id';
export class itemController {
  static async addItem(req: Request, resp: Response) {
    try {
      const item = req.body as Iitem;
      item.id = +generateUniqueId({
        useLetters: false,
        useNumbers: true,
        length: 10,
      });
      await itemRepo.addItem(item);
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
  static async getAllItems(req: Request, resp: Response) {
    try {
      const items = await itemRepo.getAllItems();
      resp.status(200).json({
        status: 'sucess',
        result: items.length,
        items,
      });
    } catch (error) {
      resp.status(403).json({
        status: 'fail',
        error,
      });
    }
  }
  static async deleteItem(req: Request, resp: Response) {
    try {
      const id = +req.params.id;
      await itemRepo.deleteItem(id);
      resp.status(204);
    } catch (error) {
      resp.status(403).json({
        status: 'fail',
        error,
      });
    }
  }
  static async updateItem(req: Request, resp: Response) {
    try {
      const id = +req.params.id;
      await itemRepo.updateItem(id, req.body);
    } catch (error) {
      resp.status(403).json({
        status: 'fail',
        error,
      });
    }
  }
}
