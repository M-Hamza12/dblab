import { Request, Response } from 'express';
import { IGuest, ICabin, IBooking } from '../Interface/interface';
import {
  addBooking,
  fetchCabin,
  fetchGuest,
  insertCabin,
  insertGuest,
} from '../repo/adminRepo';
import { refactorErrorMessage } from '../utils/error';
import { validationResult } from 'express-validator';
import { formatDate } from '../utils/date';
import { parseFormData } from '../utils/parseFormData';

import generateUniqueId from 'generate-unique-id';

export const addGuest = (req: Request, resp: Response) => {
  console.log('here');
  try {
    const guest = <IGuest>req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const error = refactorErrorMessage(result);
      return resp.status(400).json({
        status: 'fail',
        error,
      });
    }

    // random id
    guest.id = +generateUniqueId({
      useLetters: false,
      useNumbers: true,
      length: 10,
    });
    //YYYY-MM-DD
    guest.createdAt = formatDate();
    insertGuest(resp, guest);
  } catch (error) {}
};

export const addCabin = (req: Request, resp: Response) => {
  try {
    console.log(req.file?.filename);
    req.body = parseFormData(req);
    console.log(req.body);
    const cabin = <ICabin>req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const error = refactorErrorMessage(result);
      return resp.status(400).json({
        status: 'fail',
        error,
      });
    }
    // random id
    cabin.id = +generateUniqueId({
      useLetters: false,
      useNumbers: true,
      length: 10,
    });
    //YYYY-MM-DD
    cabin.createdAt = formatDate();

    //image logic should go here cabin.cabinImage = ....

    insertCabin(resp, cabin);
  } catch (error) {}
};
export const Booking = async (req: Request, resp: Response) => {
  try {
    const booking = req.body as IBooking;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      const error = refactorErrorMessage(result);
      return resp.status(400).json({
        status: 'fail',
        error,
      });
    }

    //fetching cabin and guest from the db
    const guest = await fetchGuest(booking.guestId);
    const cabin = await fetchCabin(booking.cabinId);

    //if guest is not in db
    if (!guest) throw new Error('Guest is not found.Please register your self');
    //if it is an invalid cabin
    if (!cabin) throw new Error('Invalid Cabin');

    //if all is good
    addBooking(booking, resp);
  } catch (error) {
    console.log('error');
    let message: string = '';
    if (error instanceof Error) message = error.message;
    resp.status(404).json({
      message,
    });
  }
};
