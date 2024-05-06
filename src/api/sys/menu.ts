import { defHttp } from '/@/utils/http/axios';

enum Api {
  getMenuList = '/cmct-auth/menu/list',
  getRouters = '/cmct-auth/menu/getRouters',
  addMenu = '/cmct-auth/menu',
  TreeMenuList = '/cmct-auth/menu/tree',
  removeMenu = '/cmct-auth/menu/remove/',
  menuDetail = '/cmct-auth/menu/detail/',
  menuParentTree = '/cmct-auth/menu/parent/tree',
}

/**
 * @description: 菜单列表
 */

export const getMenuList = (params) => {
  return defHttp.get({ url: Api.getMenuList, params });
};
/**
 * @description: 菜单树形列表
 */

export const getMenuTreeList = (params) => {
  return defHttp.get({ url: Api.TreeMenuList, params });
};
/**
 * @description: 菜单路由
 */
export const GETRoutersList = (params) => {
  return defHttp.get({ url: Api.getRouters, params });
};

/**
 * @description: 新增菜单
 */
export const addMenu = (params) => {
  return defHttp.post({ url: Api.addMenu, params });
};
/**
 * @description: 修改菜单
 */
export const updateMenu = (params) => {
  return defHttp.put({ url: Api.addMenu, params });
};
/**
 * @description: 删除菜单
 */
export const delMenu = (params) => {
  return defHttp.get({ url: Api.removeMenu + params });
};
/**
 * @description: 菜单详情
 */
export const getMenuDetailApi = (params) => {
  return defHttp.get({ url: Api.menuDetail + params });
};
/**
 * @description: 菜单上级下拉接口
 */
export const menuParentTreeApi = (params) => {
  return defHttp.get({ url: Api.menuParentTree, params });
};
