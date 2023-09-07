import { Response } from "express";
import { IBooking, ICabin, IGuest } from "../Interface/interface";
import { mySqlConnection } from "..";

function executeQuery(query: string): Promise<IGuest> {
  return new Promise((resolve, reject) => {
    mySqlConnection.query(query, (err, rows) => {
      if (err) reject(err);
      else resolve(rows[0]);
    });
  });
}

function executeQueryCabin(query: string): Promise<ICabin> {
  return new Promise((resolve, reject) => {
    mySqlConnection.query(query, (err, rows) => {
      if (err) reject(err);
      else resolve(rows[0]);
    });
  });
}
export const fetchGuest = async (guestId: number): Promise<IGuest | null> => {
  let guest: IGuest;
  try {
    guest = await executeQuery("SELECT * FROM GUEST WHERE id=" + guestId);
  } catch (error) {
    return null;
  }
  return guest;
};

export const fetchCabin = async (cabinId: number): Promise<ICabin | null> => {
  let cabin: ICabin;
  try {
    cabin = await executeQueryCabin("SELECT * FROM Cabin WHERE id=" + cabinId);
  } catch (error) {
    return null;
  }
  return cabin;
};

export const addBooking = (booking: IBooking, resp: Response) => {
  mySqlConnection.query("INSERT INTO BOOKING() VALUES()", (error, rows) => {
    try {
      if (error) throw error;
      resp.status(201).json({
        status: "success",
      });
    } catch (error) {
      resp.status(404).json({
        status: "fail",
      });
    }
  });
};
