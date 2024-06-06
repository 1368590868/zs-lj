import { prefix } from '../project/project';
import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  add = `${prefix}/project_phase_cost/add`,
  audit = `${prefix}/project_phase_cost/audit`,
  edit = `${prefix}/project_phase_cost/edit`,
  page = `${prefix}/project_phase_cost/page`,
  remove = `${prefix}/project_phase_cost/remove/`,
  detail = `${prefix}/project_phase_cost/detail/`,
  import = `${prefix}/project_phase_cost/import`,
  export = `${prefix}/project_phase_cost/export?ids=`,
  costLeaderAudit = `${prefix}/project_phase_cost/costLeaderAudit`,
  operationDeptAudit = `${prefix}/project_phase_cost/operationDeptAudit`,
  addAndUpdateHumanCost = `${prefix}/project_phase_cost/addAndUpdateHumanCost`,
}

/**
 * @description: 查询项目阶段成本明细
 */

export const pageApi = (params) => {
  return defHttp.get({ url: Api.page, params });
};
/**
 * @description: 新增项目阶段成本明细
 */

export const addApi = (params) => {
  return defHttp.post({ url: Api.add, params });
};
/**
 * @description: 成本明细审核
 */

export const auditApi = (params) => {
  return defHttp.post({ url: Api.audit, params });
};

/**
 * @description: 成本负责人审核
 */
export const costLeaderAuditApi = (params) => {
  return defHttp.post({ url: Api.costLeaderAudit, params });
};

/**
 * @description: 运营管理部审核
 */
export const operationDeptAuditApi = (params) => {
  return defHttp.post({ url: Api.operationDeptAudit, params });
};

/**
 * @description: 修改项目阶段成本明细
 */

export const editApi = (params) => {
  return defHttp.post({ url: Api.edit, params });
};
/**
 * @description: 删除项目阶段成本明细
 */

export const removeApi = (id) => {
  return defHttp.get({ url: Api.remove + id });
};
/**
 * @description: 详情项目阶段成本明细
 */

export const detail = (id) => {
  return defHttp.get({ url: Api.detail + id });
};

/**
 * @description: 项目阶段成本明细导入
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
 * @description: 项目阶段成本明细导出
 */

export const exportApi = (params) => {
  return defHttpFile.get({ url: Api.export + params, responseType: 'blob' });
};
/**新增人力成本 */
export const addAndUpdateHumanCostApi = (params) => {
  return defHttp.post({ url: Api.addAndUpdateHumanCost, params });
};
