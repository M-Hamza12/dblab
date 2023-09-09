import { Response } from 'express';
import { IGuest, ICabin, IBooking } from '../Interface/interface';
import { mySqlConnection } from '..';
import { fetchModel } from './genericRepo';
//adding new geust to db
export const insertGuest = (resp: Response, guest: IGuest) => {
  mySqlConnection.query('INSERT INTO GUEST() VALUES()', (error, rows) => {
    try {
      if (error) throw error;
      resp.status(201).json({
        status: 'success',
        data: {
          guest: rows[0],
        },
      });
    } catch (error) {
      resp.status(404).json({
        status: 'fail',
      });
    }
  });
};
//adding new Cabin to db
export const insertCabin = (resp: Response, cabin: ICabin) => {
  mySqlConnection.query('INSERT INTO Cabin() VALUES()', (error, rows) => {
    try {
      if (error) throw error;
      resp.status(201).json({
        status: 'success',
        data: {
          cabin: rows[0],
        },
      });
    } catch (error) {
      resp.status(404).json({
        status: 'fail',
      });
    }
  });
};

export const fetchGuest = async (guestId: number): Promise<IGuest | null> => {
  try {
    const guest = await fetchModel<IGuest>(
      'SELECT * FROM GUEST WHERE id=' + guestId
    );
    return guest;
  } catch (error) {
    return null;
  }
};

export const fetchCabin = async (cabinId: number): Promise<ICabin | null> => {
  try {
    const cabin = await fetchModel<ICabin>(
      'SELECT * FROM Cabin WHERE id=' + cabinId
    );
    return cabin;
  } catch (error) {
    return null;
  }
};

export const addBooking = (booking: IBooking, resp: Response) => {
  mySqlConnection.query('INSERT INTO BOOKING() VALUES()', (error, rows) => {
    try {
      if (error) throw error;
      resp.status(201).json({
        status: 'success',
      });
    } catch (error) {
      resp.status(404).json({
        status: 'fail',
      });
    }
  });
};
