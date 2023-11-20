import { IParamQuery } from '../Interface/interface';

export class Query {
  SELECT(columns: string[] = ['*'], table: string): string {
    let query: string = 'SELECT ';
    columns.forEach(
      (el, index) =>
        (query += index === columns.length - 1 ? el + ' ' : el + ',')
    );
    query += 'FROM ' + table;
    return query;
  }
  WHERE(column: string, value: string | number): string {
    return ` WHERE ${column}="${value}"`;
  }
  static updateById(
    id: number,
    table: string,
    data: any,
    idField: string = ''
  ): string {
    const keys = Object.keys(data);
    //making the dyanimc query
    let query = `UPDATE ${table} SET `;

    keys.forEach((k, index) => {
      if (typeof data[k] === 'string') data[k] = `'${data[k]}'`;
      if (index != 0) query += ',';

      query += `${k}=${data[k]}`;
    });
    query += ` WHERE ${idField === '' ? 'id' : idField} = ${id}`;
    return query;
  }
  static deleteById(id: number, table: string) {
    return `DELETE FROM ${table} WHERE id = ${id}`;
  }
  static paramQuery(queryString: IParamQuery): string {
    console.log(queryString);
    let query = ' ';
    if (queryString.sortBy) {
      query += `order by ${queryString.sortBy.split('-')[0]} ${
        queryString.sortBy.split('-')[1]
      } `;
    }
    const pageNo = queryString.pageNumber ? +queryString.pageNumber : 1;
    const limit = queryString.pageSize ? +queryString.pageSize : 10;
    const offset = (pageNo - 1) * limit;
    query += `LIMIT ${offset} , ${limit}`;
    return query;
  }
}
