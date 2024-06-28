import { defHttp } from '/@/utils/http/axios';
export const prefix = '/bim-cost-control-backend';

enum Api {
  findByFlowId = `${prefix}/xmlcrz/findByFlowId`,
}

/**
 * @description: 查询项目管理
 */

export const findByFlowIdApi = (params) => {
  return defHttp.get({ url: Api.findByFlowId, params });
};
