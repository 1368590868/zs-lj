import { defHttp } from '/@/utils/http/axios';
enum Api {
  datasourceEdit = '/cmct-codegen/datasource/edit',
  datasourceAdd = '/cmct-codegen/datasource/add',
  datasourceRemove = '/cmct-codegen/datasource/remove/',
  datasourceList = '/cmct-codegen/datasource/list',
  datasourceDetail = '/cmct-codegen/datasource/detail/',
}

/**
 * @description: 修改数据源
 */

export const dataSourceEditApi = (params) => {
  return defHttp.put({ url: Api.datasourceEdit, params });
};
/**
 * @description: 添加数据源
 */

export const dataSourceAddApi = (params) => {
  return defHttp.post({ url: Api.datasourceAdd, params });
};
/**
 * @description: 数据源列表
 */

export const dataSourceListApi = (params) => {
  return defHttp.get({ url: Api.datasourceList, params });
};
/**
 * @description: 数据源详情
 */

export const dataSourceDetailApi = (id) => {
  return defHttp.get({ url: Api.datasourceDetail + id });
};
/**
 * @description: 数据源详情
 */

export const dataSourceRemoveApi = (id) => {
  return defHttp.get({ url: Api.datasourceRemove + id });
};
