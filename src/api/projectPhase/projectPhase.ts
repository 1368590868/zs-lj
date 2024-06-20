import { prefix } from '../project/project';
import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  add = `${prefix}/xmlcb/add`,
  edit = `${prefix}/xmlcb/edit`,
  page = `${prefix}/xmlcb/page`,
  remove = `${prefix}/xmlcb/remove/`,
  detail = `${prefix}/xmlcb/detail/`,
  import = `${prefix}/xmlcb/import`,
  export = `${prefix}/xmlcb/export?ids=`,
  list = `${prefix}/xmlcb/list/`,
  statisticsProjectPhase = `${prefix}/xmlcb/statisticsProjectPhase`,
  findNowPhasesByProjectId = `${prefix}/xmlcb/findNowPhasesByProjectId/`,
}

/**
 * @description: 查询项目阶段
 */

export const pageApi = (params) => {
  return defHttp.get({ url: Api.page, params });
};
/**
 * @description: 新增项目阶段
 */

export const addApi = (params) => {
  return defHttp.post({ url: Api.add, params });
};
/**
 * @description: 修改项目阶段
 */

export const editApi = (params) => {
  return defHttp.post({ url: Api.edit, params });
};
/**
 * @description: 删除项目阶段
 */

export const removeApi = (id) => {
  return defHttp.get({ url: Api.remove + id });
};
/**
 * @description: 详情项目阶段
 */

export const detailApi = (id) => {
  return defHttp.get({ url: Api.detail + id });
};

/**
 * @description: 项目阶段导入
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
 * @description: 项目阶段导出
 */

export const exportApi = (params, searchParams) => {
  return defHttpFile.get({ url: Api.export + params, params: searchParams, responseType: 'blob' });
};

// 项目阶段查询
export const listApi = (params) => {
  return defHttp.get({ url: Api.list + params.id, params });
};

// 通过预警状态分组统计阶段
export const statisticsProjectPhaseApi = () => {
  return defHttp.get({ url: Api.statisticsProjectPhase });
};

/**根据当前ID查询项目当前阶段 */
export const findNowPhasesByProjectIdApi = (id) => {
  return defHttp.get({ url: Api.findNowPhasesByProjectId + id });
};
