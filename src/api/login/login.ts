import { defHttp } from '/@/utils/http/axios';
import { defLoginHttp } from '/@/utils/http/axios/login';
import { LoginParams, LoginResultModel } from './model/loginModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  GetLoginCode = '/code',
  UserLogin = '/cmct-auth/oauth/token',
  UserInfo = '/cmct-auth/user/userInfo',
  Logout = '/cmct-auth/token/logout',
  TokenCache = '/cmct-auth/token/temp/token/cache',
}
// 获取登录验证码
export function getLoginCode() {
  return defHttp.get({ url: Api.GetLoginCode });
}

// 登录
export function UserLogin(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defLoginHttp.post<LoginResultModel & { data: any }>(loginHeader(params), {
    errorMessageMode: mode,
  });
}

// 获取用户
export function getUserInfo() {
  return defHttp.get(
    {
      url: Api.UserInfo,
    },
    { errorMessageMode: 'none' },
  );
}

// 退出

export const doLogout = () => {
  return defHttp.get({ url: Api.Logout });
};
//登录集成
const loginHeader = (params: any) => {
  return {
    url: Api.UserLogin,
    params,
    headers: {
      Authorization: 'Basic Y21jdDpjbWN0',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
};
// 手机号登录
export function mobileUserLogin(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defLoginHttp.post<LoginResultModel>(loginHeader(params), {
    errorMessageMode: mode,
  });
}

// 获取Token
export function TokenCacheApi() {
  return defHttp.get({ url: Api.TokenCache });
}
