import { Request, Response } from 'express';
import { IOrder } from '../Interface/interface';
import { OrderRepo } from '../repo/orderRepo';
import generateUniqueId from 'generate-unique-id';
export class OrderController {
  static async addOrder(req: Request, resp: Response) {
    try {
      const order = req.body as IOrder;
      order.id = +generateUniqueId({
        useLetters: false,
        useNumbers: true,
        length: 10,
      });
      await OrderRepo.addOrder(order);
      resp.status(201).json({
        status: 'success',
      });
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        error,
      });
    }
  }
}
