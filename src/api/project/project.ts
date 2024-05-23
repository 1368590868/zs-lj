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
  controlDetermine = `${prefix}/project/controlDetermine/`,
  controlEndApply = `${prefix}/project/controlEndApply/`,
  controlExtensionApply = `${prefix}/project/controlExtensionApply/`,
  statisticsProject = `${prefix}/project/statisticsProject`,
  statisticsProjectByDept = `${prefix}/project/statisticsProjectByDept`,
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

// 管控判定
export const controlDetermineApi = ({ id, determineStatus }) => {
  return defHttp.get({ url: Api.controlDetermine + id, params: { determineStatus } });
};

// 管控结束申请
export const controlEndApplyApi = (id) => {
  return defHttp.get({ url: Api.controlEndApply + id });
};

// 管控延期申请
export const controlExtensionApplyApi = (id) => {
  return defHttp.get({ url: Api.controlExtensionApply + id });
};

// 通过预警状态分组统计数
export const statisticsProjectApi = () => {
  return defHttp.get({ url: Api.statisticsProject });
};

// 通过预警状态与部门分组统计项目数
export const statisticsProjectByDeptApi = () => {
  return defHttp.get({ url: Api.statisticsProjectByDept });
};
