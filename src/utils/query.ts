export class Query {
  SELECT(columns: string[] = ["*"], table: string): string {
    let query: string = "SELECT ";
    columns.forEach(
      (el, index) =>
        (query += index === columns.length - 1 ? el + " " : el + ",")
    );
    query += "FROM " + table;
    return query;
  }
  WHERE(column: string, value: string | number): string {
    return ` WHERE ${column}="${value}"`;
  }
}
