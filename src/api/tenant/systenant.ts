import { UploadApiResult } from '/@/api/sys/model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  add = '/cmct-auth/sys_tenant/add',
  edit = '/cmct-auth/sys_tenant/edit',
  page = '/cmct-auth/sys_tenant/page',
  remove = '/cmct-auth/sys_tenant/remove/',
  detail = '/cmct-auth/sys_tenant/detail/',
  import = '/api/cmct-auth/sys_tenant/import',
  export = '/cmct-auth/sys_tenant/export?ids=',
  platformAdd = '/cmct-auth/sys_tenant/platform/add',
  platformEdit = '/cmct-auth/sys_tenant/platform/edit',
}

/**
 * @description: 查询租户表
 */

export const pageApi = (params) => {
  return defHttp.get({ url: Api.page, params });
};
/**
 * @description: 新增租户表
 */

export const addApi = (params) => {
  return defHttp.post({ url: Api.add, params });
};
/**
 * @description: 新增租户表
 */

export const platformAdd = (params) => {
  return defHttp.post({ url: Api.platformAdd, params });
};
/**
 * @description: 修改租户表
 */

export const platformEdit = (params) => {
  return defHttp.put({ url: Api.platformEdit, params });
};
export const editApi = (params) => {
  return defHttp.put({ url: Api.edit, params });
};
/**
 * @description: 删除租户表
 */

export const removeApi = (id) => {
  return defHttp.get({ url: Api.remove + id });
};
/**
 * @description: 详情租户表
 */

export const detail = (id) => {
  return defHttp.get({ url: Api.detail + id });
};

/**
 * @description: 租户表导入
 */
export function importApi(params: UploadFileParams) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: Api.import,
    },
    params,
  );
}
/**
 * @description: 租户表导出
 */

export const exportApi = (params) => {
  return defHttpFile.get({ url: Api.export + params, responseType: 'blob' });
};
