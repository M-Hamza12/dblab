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
      else resolve('Model is added successfully');
    });
  });
}
