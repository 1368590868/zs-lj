import { defHttp } from '/@/utils/http/axios';
enum Api {
  codeToken = '/cmct-auth/token/code',
  codeCheck = '/cmct-auth/token/check',
}
// 获取二维码
export function codeTokenApi() {
  return defHttp.get({ url: Api.codeToken });
}
// 二维码状态 201 未扫描, 202 已扫描未授权, 204 已确认授权获取token
export function codeCheckApi(params) {
  return defHttp.get({ url: Api.codeCheck, params });
}
