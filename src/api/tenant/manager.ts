import { defTenantHttp } from '/@/utils/http/axios/tenant';
import { defHttp } from '/@/utils/http/axios';
enum Api {
  sysTenantTList = '  /cmct-auth/sys_tenant/list/tenant',
  sysTenantKeyList = '/cmct-auth/sys_tenant/list/tenant/',
  sysTenantList = '/cmct-auth/sys_tenant/list',
  sysUserTenantList = '/cmct-auth/sys_user_tenant/list',
}

/**
 * @description: 租户列表
 */

export const sysTenantListApi = () => {
  return defTenantHttp.get({ url: Api.sysTenantList });
};

export const sysTenantTListApi = () => {
  return defHttp.get({ url: Api.sysTenantTList });
};

/**
 * @description: 租户列表 key返回
 */
export const sysTenantKeyListApi = (params) => {
  return defHttp.get({ url: Api.sysTenantKeyList + params });
};
