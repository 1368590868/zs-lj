import { defHttp } from '/@/utils/http/axios';

enum Api {
  modelEdit = '/cmct-auth/model/edit',
  modelAdd = '/cmct-auth/model/add',
  modelTenantList = '/cmct-auth/sys_tenant/list/model',
  modelRemove = '/cmct-auth/model/remove/',
  modelList = '/cmct-auth/model/list',
  modelDetail = '/cmct-auth/model/detail/',
}
/**
 * @description: 修改模块
 */

export const modelEditApi = (params) => {
  return defHttp.put({ url: Api.modelEdit, params });
};
/**
 * @description: 添加模块
 */

export const modelAddApi = (params) => {
  return defHttp.post({ url: Api.modelAdd, params });
};

/**
 * @description: 根据租户id查询用户模块
 */

export const modelTenantListApi = (params) => {
  return defHttp.get({ url: Api.modelTenantList, params });
};
/**
 * @description: 删除
 */

export const modelRemoveApi = (id) => {
  return defHttp.get({ url: Api.modelRemove + id });
};
/**
 * @description: 模块查询
 */

export const modelListApi = (params) => {
  return defHttp.get({ url: Api.modelList, params });
};

/**
 * @description: 模块详情
 */

export const modelDetailApi = (id) => {
  return defHttp.get({ url: Api.modelDetail + id });
};
