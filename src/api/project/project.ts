import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

export const prefix = '/bim-cost-control-backend';

enum Api {
  add = `${prefix}/xmjcxx/add`,
  edit = `${prefix}/xmjcxx/edit`,
  page = `${prefix}/xmjcxx/page`,
  remove = `${prefix}/xmjcxx/remove/`,
  detail = `${prefix}/xmjcxx/detail/`,
  import = `${prefix}/xmjcxx/import`,
  export = `${prefix}/xmjcxx/export?ids=`,
  getProjectNameAndId = `${prefix}/xmjcxx/getProjectNameAndId`,
  logs = `${prefix}/xmczrz/page`,
  controlDetermine = `${prefix}/xmjcxx/controlDetermine/`,
  controlEndApply = `${prefix}/xmjcxx/controlEndApply/`,
  controlExtensionApply = `${prefix}/xmjcxx/controlExtensionApply/`,
  statisticsProject = `${prefix}/xmjcxx/statisticsProject`,
  statisticsProjectByDept = `${prefix}/xmjcxx/statisticsProjectByDept`,
  deptList = `${prefix}/xmjcxx/deptList`,
  deptProjectStatistics = `${prefix}/xmjcxx/deptProjectStatistics`,
  refreshProject = `${prefix}/xmjcxx/refreshProject`,
  getone = `/cmct-auth/user/getone/`,
  isUnitLeader = `/cmct-auth/role/isUnitLeader/`,
  personnal = `/cmct-auth/sys_personnel/page`,
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

// 获取部门列表
export const deptListApi = () => {
  return defHttp.get({ url: Api.deptList });
};

// 根据科室统计项目预算和成本
export const deptProjectStatisticsApi = () => {
  return defHttp.get({ url: Api.deptProjectStatistics });
};

// 刷新项目
export const refreshProjectApi = () => {
  return defHttp.get({ url: Api.refreshProject });
};

// 获取用户ID
export const getoneApi = (params) => {
  return defHttp.get({ url: Api.getone + params });
};

// 是否是单位负责人
export const isUnitLeaderApi = (params) => {
  return defHttp.get({ url: Api.isUnitLeader, params });
};

// 获取用户Code
export const getPersonnalApi = (params) => {
  return defHttp.get({ url: Api.personnal, params });
};
