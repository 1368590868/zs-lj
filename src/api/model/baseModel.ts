export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}
export interface BasicMenuResult<T> {
  records: T[];
  total: number;
}
