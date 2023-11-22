import { mySqlConnection } from '..';
export function fetchModel<T>(query: string): Promise<T> {
  return new Promise((resolve, reject) => {
    mySqlConnection.query(query, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
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
): Promise<{
  startDate: Date;
  endDate: Date;
}> {
  return new Promise((resolve, reject) => {
    mySqlConnection.query(
      `call GetFutureBookingsForCabin(${cabinId},'${date}');`,
      (error, rows) => {
        if (error) {
          reject(error);
        }
        resolve(rows);
      }
    );
  });
}
