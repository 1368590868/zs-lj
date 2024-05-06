import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  add = '/cmct-auth/sys_banner/add',
  edit = '/cmct-auth/sys_banner/edit',
  page = '/cmct-auth/sys_banner/page',
  remove = '/cmct-auth/sys_banner/remove/',
  detail = '/cmct-auth/sys_banner/detail/',
  import = '/cmct-auth/sys_banner/import',
  export = '/cmct-auth/sys_banner/export?ids=',
}

/**
 * @description: 查询轮播图管理
 */

export const pageApi = (params) => {
  return defHttp.get({ url: Api.page, params });
};
/**
 * @description: 新增轮播图管理
 */

export const addApi = (params) => {
  return defHttp.post({ url: Api.add, params });
};
/**
 * @description: 修改轮播图管理
 */

export const editApi = (params) => {
  return defHttp.post({ url: Api.edit, params });
};
/**
 * @description: 删除轮播图管理
 */

export const removeApi = (id) => {
  return defHttp.get({ url: Api.remove + id });
};
/**
 * @description: 详情轮播图管理
 */

export const detail = (id) => {
  return defHttp.get({ url: Api.detail + id });
};

/**
 * @description: 轮播图管理导入
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
 * @description: 轮播图管理导出
 */

export const exportApi = (params) => {
  return defHttpFile.get({ url: Api.export + params, responseType: 'blob' });
};
