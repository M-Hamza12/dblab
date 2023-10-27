import { IGuest, IUpdateGuest } from '../Interface/interface';
import { Request, Response } from 'express';
import { formatDate } from '../utils/date';
import { GuestRepo } from '../repo/guestRepo';
import generateUniqueId from 'generate-unique-id';

export class GuestController {

  static addGuest(req: Request, resp: Response) {
    try {
      const guest = req.body as IGuest;
      // random id
      guest.id = +generateUniqueId({
        useLetters: false,
        useNumbers: true,
        length: 10,
      });
      //YYYY-MM-DD
      guest.createdAt = formatDate();

      let message = await GuestRepo.addGuest(guest);

      resp.status(201).json({
        status: 'success',
        message,
      });
    } catch (error) {
      resp.status(404).json({
        status: 'fail',
        error,
      });
    }
  }
  static async getAllGuests(req: Request, resp: Response) {
    try {
      const guests = await GuestRepo.getAllGuest();
      resp.status(200).json({
        status: 'success',
        result: guests.length,
        guests,
      });
    } catch (error) {
      resp.status(404).json({
        status: 'fail',
        error,
      });
    }
  }
  static async getGuestById(req: Request, resp: Response) {
    try {
      const id = +req.params.id;
      const guest = await GuestRepo.fetchGuest(id);
      resp.status(200).json({
        status: 'success',
        guest,
      });
    } catch (error) {
      resp.status(404).json({
        status: 'fail',
        error,
      });
    }
  }
  static async updateGuest(req: Request, resp: Response) {
    try {
      const id = +req.params.id;
      const message = await GuestRepo.updateGuest(id, req.body as IUpdateGuest);
      resp.status(203).json({
        status: 'success',
        message,
      });
    } catch (error) {
      resp.status(404).json({
        status: 'fail',
        error,
      });
    }
  }
  static async deleteGuest(req: Request, resp: Response) {
    try {
      const id = +req.params.id;
      const message = await GuestRepo.deleteGuest(id);
      resp.status(204).json({
        status: 'success',
        message,
      });
    } catch (error) {
      resp.status(404).json({
        status: 'fail',
        error,
      });
    }
  }
}
