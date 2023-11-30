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
  // implement fetch orders by guest id
  static async fetchOrders(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        resp.status(400).json({
          status: 'fail',
          message: 'Please provide an id',
        });
      }
      const orders = await OrderRepo.fetchOrders(+id);
      if (!orders) {
        resp.status(404).json({
          status: 'fail',
          message: 'No orders found',
        });
      }
      resp.status(200).json({
        status: 'success',
        count: orders.length,
        orders,
      });
    } catch (error) {
      resp.status(400).json({
        status: 'fail',
        error,
      });
    }
  }
}
