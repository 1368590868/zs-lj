import { prefix } from '../project/project';
import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  add = `${prefix}/project_output_value/add`,
  edit = `${prefix}/project_output_value/edit`,
  page = `${prefix}/project_output_value/page`,
  remove = `${prefix}/project_output_value/remove/`,
  detail = `${prefix}/project_output_value/detail/`,
  import = `${prefix}/project_output_value/import`,
  export = `${prefix}/project_output_value/export?ids=`,
  findYearAndMoth = `${prefix}/project_output_value/findYearAndMoth`,
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
export const findYearAndMothApi = () => {
  return defHttp.get({ url: Api.findYearAndMoth });
};
