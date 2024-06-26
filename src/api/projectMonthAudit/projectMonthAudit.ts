import { prefix } from '../project/project';
import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  add = `${prefix}/xmydsh/add`,
  edit = `${prefix}/xmydsh/edit`,
  page = `${prefix}/xmydsh/page`,
  remove = `${prefix}/xmydsh/remove/`,
  detail = `${prefix}/xmydsh/detail/`,
  import = `${prefix}/xmydsh/import`,
  export = `${prefix}/xmydsh/export?ids=`,
  operationDeptAudit = `${prefix}/xmydsh/operationDeptAudit`,
  costLeaderAudit = `${prefix}/xmydsh/costLeaderAudit`,
}

/**
 * 月度审核意见
 */
export const monthAuditApi = (params, type) => {
  switch (type) {
    case 'cost':
      return defHttp.post({ url: Api.costLeaderAudit, params });
    default:
      return defHttp.post({ url: Api.operationDeptAudit, params });
  }
};

/**
 * @description: 查询项目月度审核
 */

export const pageApi = (params) => {
  return defHttp.get({ url: Api.page, params });
};
/**
 * @description: 新增项目月度审核
 */

export const addApi = (params) => {
  return defHttp.post({ url: Api.add, params });
};
/**
 * @description: 修改项目月度审核
 */

export const editApi = (params) => {
  return defHttp.post({ url: Api.edit, params });
};
/**
 * @description: 删除项目月度审核
 */

export const removeApi = (id) => {
  return defHttp.get({ url: Api.remove + id });
};
/**
 * @description: 详情项目月度审核
 */

export const detail = (id) => {
  return defHttp.get({ url: Api.detail + id });
};

/**
 * @description: 项目月度审核导入
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
 * @description: 项目月度审核导出
 */

export const exportApi = (params) => {
  return defHttpFile.get({ url: Api.export, params, responseType: 'blob' });
};
