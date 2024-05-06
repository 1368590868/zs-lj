import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  updateTypeDict = '/cmct-auth/dict/type/update',
  addTypeDict = '/cmct-auth/dict/type/add',
  listTypeDict = '/cmct-auth/dict/type/list',
  detailTypeDict = '/cmct-auth/dict/type/detail/',
  removeTypeDict = '/cmct-auth/dict/type/remove/',
  importTypeDict = '/api/cmct-auth/dict/type/import',
  exportTypeDict = '/cmct-auth/dict/type/export?ids=',
  flushTypeDict = '/cmct-auth/dict/type/flush',
  updateDataDict = '/cmct-auth/dict/data/update',
  addDataDict = '/cmct-auth/dict/data/add',
  listDataDict = '/cmct-auth/dict/data/list',
  detailDataDict = '/cmct-auth/dict/data/detail/',
  removeDataDict = '/cmct-auth/dict/data/remove/',
}
/**
 * @description: 字典类型导入
 */

export function importTypeDictApi(params: UploadFileParams) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: Api.importTypeDict,
    },
    params,
  );
}

/**
 * @description: 字典类型导出
 */

export const exportTypeDictApi = (params) => {
  return defHttpFile.get({ url: Api.exportTypeDict + params, responseType: 'blob' });
};
/**
 * @description: 修改字典类型
 */

export const updateTypeDictApi = (params) => {
  return defHttp.post({ url: Api.updateTypeDict, params });
};
/**
 * @description: 字典类型新增
 */

export const addTypeDictApi = (params) => {
  return defHttp.post({ url: Api.addTypeDict, params });
};
/**
 * @description: 字典类型列表
 */

export const listTypeDictApi = (params) => {
  return defHttp.get({ url: Api.listTypeDict, params });
};
/**
 * @description: 字典类型详情
 */

export const detailTypeDictApi = (params) => {
  return defHttp.get({ url: Api.detailTypeDict + params });
};
/**
 * @description: 字典类型删除
 */

export const removeTypeDictApi = (params) => {
  return defHttp.get({ url: Api.removeTypeDict + params });
};
/**
 * @description: 刷新缓存
 */

export const flushTypeDictApi = () => {
  return defHttp.get({ url: Api.flushTypeDict });
};

/**
 * @description: 修改字典项
 */

export const updateDataDictApi = (params) => {
  return defHttp.post({ url: Api.updateDataDict, params });
};
/**
 * @description: 字典项新增
 */

export const addDataDictApi = (params) => {
  return defHttp.post({ url: Api.addDataDict, params });
};
/**
 * @description: 字典项列表
 */

export const listDataDictApi = (params) => {
  return defHttp.get({ url: Api.listDataDict, params });
};
/**
 * @description: 字典项详情
 */

export const detailDataDictApi = (params) => {
  return defHttp.get({ url: Api.detailDataDict + params });
};
/**
 * @description: 字典项删除
 */

export const removeDataDictApi = (params) => {
  return defHttp.get({ url: Api.removeDataDict + params });
};
