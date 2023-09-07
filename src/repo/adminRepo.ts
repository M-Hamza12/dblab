import { Response } from "express";
import { IGuest, ICabin } from "../Interface/interface";
import { mySqlConnection } from "..";
//adding new geust to db
export const insertGuest = (resp: Response, guest: IGuest) => {
  mySqlConnection.query("INSERT INTO GUEST() VALUES()", (error, rows) => {
    try {
      if (error) throw error;
      resp.status(201).json({
        status: "success",
        data: {
          guest: rows[0],
        },
      });
    } catch (error) {
      resp.status(404).json({
        status: "fail",
      });
    }
  });
};
//adding new Cabin to db
export const insertCabin = (resp: Response, cabin: ICabin) => {
  mySqlConnection.query("INSERT INTO Cabin() VALUES()", (error, rows) => {
    try {
      if (error) throw error;
      resp.status(201).json({
        status: "success",
        data: {
          cabin: rows[0],
        },
      });
    } catch (error) {
      resp.status(404).json({
        status: "fail",
      });
    }
  });
};
