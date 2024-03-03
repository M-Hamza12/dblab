import { OkPacket } from 'mysql';
import { mySqlConnection } from '..';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IBookingDate } from '../Interface/interface';
export function fetchModel<T>(query: string): Promise<T> {
  return new Promise((resolve, reject) => {
    mySqlConnection.query(
      query,
      (err: any, rows: RowDataPacket | RowDataPacket[]) => {
        if (err) reject(err);
        else resolve(rows as T);
      }
    );
  });
}

export function addModel(query: string): Promise<string> {
  return new Promise((resolve, reject) => {
    mySqlConnection.query(query, (err, rows) => {
      if (err) reject(err);
      else resolve(query.split(' ')[3] + ' is added successfully');
    });
  });
}

export function updateModel(query: string): Promise<string> {
  return new Promise((resolve, reject) => {
    mySqlConnection.query(query, (err, rows) => {
      console.log('rows', rows);
      if (err) reject(err);
      else resolve(query.split(' ')[1] + ' updated successfully');
    });
  });
}

export function deleteModel(query: string): Promise<string> {
  return new Promise((resolve, reject) => {
    mySqlConnection.query(query, (err, rows) => {
      console.log('rows', rows);
      if (err) reject(err);
      else resolve(query.split(' ')[2] + ' deleted successfully');
    });
  });
}

export function getFutureBookingProcedure(
  cabinId: number,
  date: string
): Promise<IBookingDate> {
  return new Promise((resolve, reject) => {
    mySqlConnection.query(
      `call GetFutureBookingsForCabin(${cabinId},'${date}');`,
      (error: any, rows: RowDataPacket | RowDataPacket[]) => {
        if (error) {
          reject(error);
        }
        resolve(rows as IBookingDate);
      }
    );
  });
}
