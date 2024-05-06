import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  add = '/cmct-auth/sys_apk_info/add',
  edit = '/cmct-auth/sys_apk_info/edit',
  page = '/cmct-auth/sys_apk_info/page',
  remove = '/cmct-auth/sys_apk_info/remove/',
  detail = '/cmct-auth/sys_apk_info/detail/',
  import = '/cmct-auth/sys_apk_info/import',
  export = '/cmct-auth/sys_apk_info/export?ids=',
}

/**
 * @description: 查询
 */

export const pageApi = (params) => {
  return defHttp.get({ url: Api.page, params });
};
/**
 * @description: 新增
 */

export const addApi = (params) => {
  return defHttp.post({ url: Api.add, params });
};
/**
 * @description: 修改
 */

export const editApi = (params) => {
  return defHttp.post({ url: Api.edit, params });
};
/**
 * @description: 删除
 */

export const removeApi = (id) => {
  return defHttp.get({ url: Api.remove + id });
};
/**
 * @description: 详情
 */

export const detail = (id) => {
  return defHttp.get({ url: Api.detail + id });
};

/**
 * @description: 导入
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
 * @description: 导出
 */

export const exportApi = (params) => {
  return defHttpFile.get({ url: Api.export + params, responseType: 'blob' });
};
