import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  add = '/cmct-auth/sys_proposal/add',
  edit = '/cmct-auth/sys_proposal/edit',
  page = '/cmct-auth/sys_proposal/page',
  read = '/cmct-auth/sys_proposal/read/',
  remove = '/cmct-auth/sys_proposal/remove/',
  detail = '/cmct-auth/sys_proposal/detail/',
  import = '/cmct-auth/sys_proposal/import',
  export = '/cmct-auth/sys_proposal/export?ids=',
}

/**
 * @description: 查询用户建议
 */

export const pageApi = (params) => {
  return defHttp.get({ url: Api.page, params });
};
/**
 * @description: 新增用户建议
 */

export const addApi = (params) => {
  return defHttp.post({ url: Api.add, params });
};
/**
 * @description: 修改用户建议
 */

export const editApi = (params) => {
  return defHttp.put({ url: Api.edit, params });
};
/**
 * @description: 删除用户建议
 */

export const removeApi = (id) => {
  return defHttp.get({ url: Api.remove + id });
};
/**
 * @description: 已读用户建议
 */

export const readApi = (id) => {
  return defHttp.get({ url: Api.read + id });
};
/**
 * @description: 详情用户建议
 */

export const detail = (id) => {
  return defHttp.get({ url: Api.detail + id });
};

/**
 * @description: 用户建议导入
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
 * @description: 用户建议导出
 */

export const exportApi = (params) => {
  return defHttpFile.get({ url: Api.export + params, responseType: 'blob' });
};
