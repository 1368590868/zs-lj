import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

export const prefix = '/bim-cost-control-backend';

enum Api {
  add = `${prefix}/project/add`,
  edit = `${prefix}/project/edit`,
  page = `${prefix}/project/page`,
  remove = `${prefix}/project/remove/`,
  detail = `${prefix}/project/detail/`,
  import = `${prefix}/project/import`,
  export = `${prefix}/project/export?ids=`,
  getProjectNameAndId = `${prefix}/project/getProjectNameAndId`,
  logs = `${prefix}/project_operation_log/page`,
}

/**
 * @description: 查询项目管理
 */

export const pageApi = (params) => {
  return defHttp.get({ url: Api.page, params });
};
/**
 * @description: 新增项目管理
 */

export const addApi = (params) => {
  return defHttp.post({ url: Api.add, params });
};
/**
 * @description: 修改项目管理
 */

export const editApi = (params) => {
  return defHttp.post({ url: Api.edit, params });
};
/**
 * @description: 删除项目管理
 */

export const removeApi = (id) => {
  return defHttp.get({ url: Api.remove + id });
};
/**
 * @description: 详情项目管理
 */

export const detail = (id) => {
  return defHttp.get({ url: Api.detail + id });
};

/**
 * @description: 项目管理导入
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
 * @description: 项目管理导出
 */

export const exportApi = (params) => {
  return defHttpFile.get({ url: Api.export + params, responseType: 'blob' });
};

/**
 * @description: 获取项目名称和id
 */
export const getProjectNameAndId = () => {
  return defHttp.get({ url: Api.getProjectNameAndId });
};

export const getLogsApi = (params) => {
  return defHttp.get({ url: Api.logs, params });
};
