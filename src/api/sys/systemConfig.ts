import { defHttp } from '/@/utils/http/axios';

enum Api {
  addSetting = '/cmct-auth/setting/add',
  detailSetting = '/cmct-auth/setting/detail',
}

/**
 * @description: 添加或修改系统配置
 */

export const addSettingApi = (params) => {
  return defHttp.post({ url: Api.addSetting, params });
};
/**
 * @description: 添加或修改系统配置
 */

export const detailSettingApi = (params) => {
  return defHttp.get({ url: Api.detailSetting, params });
};
