import { IGuest } from '../Interface/interface';
import { Request, Response } from 'express';
import { formatDate } from '../utils/date';
import { GuestRepo } from '../repo/guestRepo';
import generateUniqueId from 'generate-unique-id';

export class GuestController {
  static addGuest(req: Request, resp: Response) {
    console.log('here');
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
      GuestRepo.addGuest(resp, guest);
    } catch (error) {}
  }
}
