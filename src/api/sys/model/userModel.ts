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

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  userName?: string;
  // 用户名
  nickName: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
