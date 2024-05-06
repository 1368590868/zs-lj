import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  add = '/cmct-auth/sys_operate_log/add',
  edit = '/cmct-auth/sys_operate_log/edit',
  page = '/cmct-auth/sys_operate_log/page',
  remove = '/cmct-auth/sys_operate_log/remove/',
  detail = '/cmct-auth/sys_operate_log/detail/',
  import = '/cmct-auth/sys_operate_log/import',
  export = '/cmct-auth/sys_operate_log/export?ids=',
}

/**
 * @description: 查询操作日志
 */

export const pageApi = (params) => {
  return defHttp.get({ url: Api.page, params });
};
/**
 * @description: 新增操作日志
 */

export const addApi = (params) => {
  return defHttp.post({ url: Api.add, params });
};
/**
 * @description: 修改操作日志
 */

export const editApi = (params) => {
  return defHttp.put({ url: Api.edit, params });
};
/**
 * @description: 删除操作日志
 */

export const removeApi = (id) => {
  return defHttp.get({ url: Api.remove + id });
};
/**
 * @description: 详情操作日志
 */

export const detail = (id) => {
  return defHttp.get({ url: Api.detail + id });
};

/**
 * @description: 操作日志导入
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
 * @description: 操作日志导出
 */

export const exportApi = (params) => {
  return defHttpFile.get({ url: Api.export + params, responseType: 'blob' });
};
