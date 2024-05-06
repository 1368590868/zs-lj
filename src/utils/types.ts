//新增
export type Result<T = any> = {
  code: number;
  msg: string;
  data: T;
};
