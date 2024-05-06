import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  genSubmit = '/cmct-codegen/gen/edit/submit',
  genSyncTable = '/cmct-codegen/gen/syncTable',
  genRemove = '/cmct-codegen/gen/remove',
  genList = '/cmct-codegen/gen/list',
  genEditDetail = '/cmct-codegen/gen/edit/detail',
  genDetail = '/cmct-codegen/gen/detail',
  genCode = '/cmct-codegen/gen/code',
  genOneKey = '/cmct-codegen/gen/onekey',
}

/**
 * @description: 代码列表
 */

export const genListApi = (params) => {
  return defHttp.get({ url: Api.genList, params });
};
/**
 * @description: 编辑提交
 */

export const genSubmitApi = (params) => {
  return defHttp.put({ url: Api.genSubmit, params });
};

/**
 * @description: 同步
 */

export const genSyncTableApi = (params) => {
  return defHttp.get({ url: Api.genSyncTable, params });
};
/**
 * @description: 删除
 */

export const genRemoveApi = (params) => {
  return defHttp.get({ url: Api.genRemove, params });
};
/**
 * @description: 编辑详情
 */

export const genEditDetailApi = (params) => {
  return defHttp.get({ url: Api.genEditDetail, params });
};
/**
 * @description: 预览
 */

export const genDetailApi = (params) => {
  return defHttp.get({ url: Api.genDetail, params });
};
/**
 * @description: 生成
 */

// export const genCodeApi = (params) => {
//   return defHttp.get({ url: Api.genCode, params });
// };
export const genCodeApi = (params) => {
  return defHttpFile.post({ url: Api.genCode, params, responseType: 'blob' });
};

export const genOneKeyApi = (params) => {
  return defHttpFile.post({ url: Api.genOneKey, params });
};
