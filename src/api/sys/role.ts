import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';
// import { getMenuListResultModel, MenuParams } from './model/menuModel';
enum Api {
  addRole = '/cmct-auth/role',
  updateRole = '/cmct-auth/role',
  getRoleList = '/cmct-auth/role/list',
  delRole = '/cmct-auth/role/',
  addAuthMenu = '/cmct-auth/role/authMenu',
  addAuthUser = '/cmct-auth/role/authUser',
  importRole = '/api/cmct-auth/role/import',
  exportRole = '/cmct-auth/role/export?ids=',
}

/**
 * @description: 角色列表
 */

export const getRoleListApi = (params) => {
  return defHttp.get({ url: Api.getRoleList, params });
};
/**
 * @description: 删除角色
 */

export const delRoleApi = (params) => {
  return defHttp.get({ url: Api.delRole + params });
};
/**
 * @description: 新增角色
 */

export const addRoleApi = (params) => {
  return defHttp.post({ url: Api.addRole, params });
};
/**
 * @description: 修改角色
 */

export const updateRoleApi = (params) => {
  return defHttp.put({ url: Api.updateRole, params });
};
/**
 * @description: 角色授权菜单权限
 */

export const saveAuthMenuApi = (params) => {
  return defHttp.post({ url: Api.addAuthMenu, params });
};
/**
 * @description: 角色分配用户
 */

export const addAuthUserApi = (params) => {
  return defHttp.post({ url: Api.addAuthUser, params });
};
/**
 * @description: 角色导入
 */
export function importRoleApi(params: UploadFileParams) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: Api.importRole,
    },
    params,
  );
}
/**
 * @description: 角色导出
 */

export const exportRoleApi = (params) => {
  return defHttpFile.get({ url: Api.exportRole + params, responseType: 'blob' });
};
