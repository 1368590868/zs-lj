import { defHttp } from '/@/utils/http/axios';
// import { getMenuListResultModel, MenuParams } from './model/menuModel';

enum Api {
  addNotice = '/cmct-auth/notice/add',
  editNotice = '/cmct-auth/notice/edit',
  getNoticeList = '/cmct-auth/notice/list',
  detailNotice = '/cmct-auth/notice/detail/',
  detailEditNotice = '/cmct-auth/notice/edit/detail/',
  delNotice = '/cmct-auth/notice/remove/',
  queryNotice = '/cmct-auth/notice/top/query/',
}

/**
 * @description: 公告信息列表
 */

export const getNoticeListApi = (params) => {
  return defHttp.get({ url: Api.getNoticeList, params });
};
/**
 * @description: 删除公告
 */

export const delNoticeApi = (params) => {
  return defHttp.get({ url: Api.delNotice + params });
};
/**
 * @description: 新增公告
 */

export const addNoticeApi = (params) => {
  return defHttp.post({ url: Api.addNotice, params });
};
/**
 * @description: 修改公告
 */

export const editNoticeApi = (params) => {
  return defHttp.post({ url: Api.editNotice, params });
};
/**
 * @description: 公告详情
 */

export const detailNoticeApi = (params) => {
  return defHttp.get({ url: Api.detailNotice + params });
};
/**
 * @description: 公告修改详情
 */

export const detailEditNoticeApi = (params) => {
  return defHttp.get({ url: Api.detailEditNotice + params });
};
/**
 * @description: 查询顶部消息
 */

export const queryNoticeApi = (id, params) => {
  return defHttp.get({ url: Api.queryNotice + id, params });
};
