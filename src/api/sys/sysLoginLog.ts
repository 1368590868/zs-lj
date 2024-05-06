import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  add = '/cmct-auth/sys_login_log/add',
  edit = '/cmct-auth/sys_login_log/edit',
  page = '/cmct-auth/sys_login_log/page',
  remove = '/cmct-auth/sys_login_log/remove/',
  detail = '/cmct-auth/sys_login_log/detail/',
  import = '/cmct-auth/sys_login_log/import',
  export = '/cmct-auth/sys_login_log/export?ids=',
}

/**
 * @description: 查询登录日志
 */

export const pageApi = (params) => {
  return defHttp.get({ url: Api.page, params });
};
/**
 * @description: 新增登录日志
 */

export const addApi = (params) => {
  return defHttp.post({ url: Api.add, params });
};
/**
 * @description: 修改登录日志
 */

export const editApi = (params) => {
  return defHttp.put({ url: Api.edit, params });
};
/**
 * @description: 删除登录日志
 */

export const removeApi = (id) => {
  return defHttp.get({ url: Api.remove + id });
};
/**
 * @description: 详情登录日志
 */

export const detail = (id) => {
  return defHttp.get({ url: Api.detail + id });
};

/**
 * @description: 登录日志导入
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
 * @description: 登录日志导出
 */

export const exportApi = (params) => {
  return defHttpFile.get({ url: Api.export + params, responseType: 'blob' });
};
