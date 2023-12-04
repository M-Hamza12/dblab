import { addModel, fetchModel } from './genericRepo';
import { IOrder } from '../Interface/interface';
import { formatDate } from '../utils/date';
export class OrderRepo {
  static async addOrder(order: IOrder) {
    try {
      let totalPrice = 0;
      order.items.forEach((i) => {
        totalPrice += i.price * i.quantity;
      });

      const promise1 = addModel(
        `insert into orders values(${order.id},${totalPrice},${
          order.bookingId
        },'${formatDate()}')`
      );
      const promises = order.items.map((item) => {
        return addModel(
          `insert into orderItems values(${order.id},${item.itemId},${item.quantity})`
        );
      });
      await Promise.all([promise1, ...promises]);
    } catch (error) {
      throw error;
    }
  }
  static async fetchOrders(bookingId: number) {
    try {
      const orders = await fetchModel<IOrder[]>(
        `select * from orders where bookingId = ${bookingId}`
      );
      return orders;
    } catch (error) {
      throw error;
    }
  }
  static async fetchOrdersByGuestId(guestId: number) {
    try {
      const orders = await fetchModel<IOrder[]>(
        `SELECT o.*, g.fullName AS guestName
        FROM orders o
        INNER JOIN bookings b ON o.bookingId = b.id
        INNER JOIN guests g ON b.guestId = g.id
        WHERE g.id = ${guestId}`
      );
      return orders;
    } catch (error) {
      throw error;
    }
  }
}
