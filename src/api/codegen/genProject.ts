import { UploadApiResult } from './uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  add = '/cmct-codegen/gen_project/add',
  edit = '/cmct-codegen/gen_project/edit',
  page = '/cmct-codegen/gen_project/page',
  remove = '/cmct-codegen/gen_project/remove/',
  detail = '/cmct-codegen/gen_project/detail/',
  import = '/cmct-codegen/gen_project/import',
  export = '/cmct-codegen/gen_project/export?ids=',
}

/**
 * @description: 查询生成工程
 */

export const pageApi = (params) => {
  return defHttp.get({ url: Api.page, params });
};
/**
 * @description: 新增生成工程
 */

export const addApi = (params) => {
  return defHttpFile.post({ url: Api.add, params, responseType: 'blob', timeout: 1000 * 60 * 60 });
};
/**
 * @description: 修改生成工程
 */

export const editApi = (params) => {
  return defHttpFile.post({ url: Api.edit, params, responseType: 'blob', timeout: 1000 * 60 * 60 });
};
/**
 * @description: 删除生成工程
 */

export const removeApi = (id) => {
  return defHttp.get({ url: Api.remove + id });
};
/**
 * @description: 详情生成工程
 */

export const detail = (id) => {
  return defHttp.get({ url: Api.detail + id });
};

/**
 * @description: 生成工程导入
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
 * @description: 生成工程导出
 */

export const exportApi = (params) => {
  return defHttpFile.get({
    url: Api.export + params,
    responseType: 'blob',
    timeout: 1000 * 60 * 60,
  });
};
