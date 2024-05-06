import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';

enum Api {
  deptTree = '/cmct-auth/dept/tree',
  deptList = '/cmct-auth/dept/list',
  addDept = '/cmct-auth/dept/add',
  editDept = '/cmct-auth/dept/edit',
  deptDetail = '/cmct-auth/dept/detail/',
  delDept = '/cmct-auth/dept/',
  importDept = '/api/cmct-auth/dept/import',
  exportDept = '/cmct-auth/dept/export?ids=',
}
/**
 * @description: 部门列表
 */

export const deptListApi = (params) => {
  return defHttp.get({ url: Api.deptList, params });
};
/**
 * @description: 部门下拉树列表
 */

export const deptTreeApi = (params) => {
  return defHttp.get({ url: Api.deptTree, params });
};
/**
 * @description: 部门新增
 */

export const addDeptApi = (params) => {
  return defHttp.post({ url: Api.addDept, params });
};
/**
 * @description: 部门修改
 */

export const editDeptApi = (params) => {
  return defHttp.post({ url: Api.editDept, params });
};
/**
 * @description: 部门详情
 */

export const deptDetailApi = (params) => {
  return defHttp.get({ url: Api.deptDetail + params });
};
/**
 * @description: 部门删除
 */

export const delDeptApi = (params) => {
  return defHttp.get({ url: Api.delDept + params });
};
/**
 * @description: 部门导入
 */

export function importDeptApi(params: UploadFileParams) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: Api.importDept,
    },
    params,
  );
}

/**
 * @description: 部门导出
 */

export const exportDeptApi = (params) => {
  return defHttpFile.get({ url: Api.exportDept + params, responseType: 'blob' });
};
