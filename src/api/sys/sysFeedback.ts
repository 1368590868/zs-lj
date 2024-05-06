import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  add = '/cmct-auth/sys_feedback/add',
  edit = '/cmct-auth/sys_feedback/edit',
  page = '/cmct-auth/sys_feedback/page',
  remove = '/cmct-auth/sys_feedback/remove/',
  detail = '/cmct-auth/sys_feedback/detail/',
  import = '/cmct-auth/sys_feedback/import',
  export = '/cmct-auth/sys_feedback/export?ids=',
  operation = '/cmct-auth/sys_feedback/operation',
}

/**
 * @description: 查询用户反馈
 */

export const pageApi = (params) => {
  return defHttp.get({ url: Api.page, params });
};
/**
 * @description: 新增用户反馈
 */

export const addApi = (params) => {
  return defHttp.post({ url: Api.add, params });
};
/**
 * @description: 修改用户反馈
 */

export const editApi = (params) => {
  return defHttp.put({ url: Api.edit, params });
};
/**
 * @description: 删除用户反馈
 */

export const removeApi = (id) => {
  return defHttp.get({ url: Api.remove + id });
};
/**
 * @description: 用户反馈状态处理
 */

export const operationApi = (params) => {
  return defHttp.post({ url: Api.operation, params });
};
/**
 * @description: 详情用户反馈
 */

export const detail = (id) => {
  return defHttp.get({ url: Api.detail + id });
};

/**
 * @description: 用户反馈导入
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
 * @description: 用户反馈导出
 */

export const exportApi = (params) => {
  return defHttpFile.get({ url: Api.export + params, responseType: 'blob' });
};
