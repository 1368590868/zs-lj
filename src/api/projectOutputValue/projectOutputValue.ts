import { prefix } from '../project/project';
import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  add = `${prefix}/xmcz/add`,
  edit = `${prefix}/xmcz/edit`,
  page = `${prefix}/xmcz/page`,
  remove = `${prefix}/xmcz/remove/`,
  detail = `${prefix}/xmcz/detail/`,
  import = `${prefix}/xmcz/import`,
  export = `${prefix}/xmcz/export?ids=`,
  findYearAndMoth = `${prefix}/xmcz/findYearAndMoth`,
}

/**
 * @description: 查询项目产值
 */

export const pageApi = (params) => {
  return defHttp.get({ url: Api.page, params });
};
/**
 * @description: 新增项目产值
 */

export const addApi = (params) => {
  return defHttp.post({ url: Api.add, params });
};
/**
 * @description: 修改项目产值
 */

export const editApi = (params) => {
  return defHttp.post({ url: Api.edit, params });
};
/**
 * @description: 删除项目产值
 */

export const removeApi = (id) => {
  return defHttp.get({ url: Api.remove + id });
};
/**
 * @description: 详情项目产值
 */

export const detail = (id) => {
  return defHttp.get({ url: Api.detail + id });
};

/**
 * @description: 项目产值导入
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
 * @description: 项目产值导出
 */

export const exportApi = (params) => {
  return defHttpFile.get({ url: Api.export + params, responseType: 'blob' });
};

// 获取年月
export const findYearAndMothApi = (params) => {
  return defHttp.get({ url: Api.findYearAndMoth, params });
};
