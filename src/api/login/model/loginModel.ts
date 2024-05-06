/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  access_token: string;
  token_type: string;
  token: string;
  code: number;
  msg: string;
}

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username?: string;
  password?: string;
  grant_type: string;
  mobile?: number;
  code?: string;
  uuid?: string;
}
