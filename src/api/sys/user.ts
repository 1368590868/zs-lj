import { UploadApiResult } from './model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { defHttpFile } from '/@/utils/http/axios/file';
enum Api {
  GetPermCode = '/getPermCode',
  userReset = '/cmct-auth/user/reset',
  userAdd = '/cmct-auth/user/add',
  userEdit = '/cmct-auth/user/edit',
  userImport = '/cmct-auth/user/import',
  userAuthRole = '/cmct-auth/user/authRole',
  userRemove = '/cmct-auth/user/',
  userInfo = '/cmct-auth/user/userInfo',
  userSendSms = '/cmct-auth/user/sendSms/',
  userSendLoginSms = '/cmct-auth/user/sendSms/login/',
  userRecovery = '/cmct-auth/user/recovery',
  userList = '/cmct-auth/user/list',
  userFrozen = '/cmct-auth/user/frozen/',
  userThaw = '/cmct-auth/user/thaw/',
  userDetail = '/cmct-auth/user/detail/',
  userRegister = '/cmct-auth/user/register',
  userEditInfo = '/cmct-auth/user/edit/info',
  userEditPass = '/cmct-auth/user/edit/pass',
  exportUser = '/cmct-auth/user/export?ids=',
  importUser = '/api/cmct-auth/user/import',
  getRoleIdsUser = '/cmct-auth/user/getRoleIds',
  userFindCode = '/cmct-auth/user/find/code',
  userFindPassword = '/cmct-auth/user/find/password',
  getCodeByAccount = '/cmct-auth/user/sms/code/',
  sendSmsCode = '/cmct-auth/user/sendSms/login/',
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}
/**
 * @description: 重置密码
 */

export const userResetApi = (params) => {
  return defHttp.post({ url: Api.userReset, params });
};
/**
 * @description: 用户导入
 */

export const userImportApi = (params) => {
  return defHttp.post({ url: Api.userImport, params });
};

/**
 * @description: 用户授权角色
 */

export const userAuthRoleApi = (params) => {
  return defHttp.post({ url: Api.userAuthRole, params });
};
/**
 * @description: 用户列表
 */

export const getUserListApi = (params) => {
  return defHttp.get({ url: Api.userList, params });
};

/**
 * @description: 用户详情
 */

export const getUserDetailApi = (params) => {
  return defHttp.get({ url: Api.userDetail + params });
};

/**
 * @description: 删除用户
 */

export const userRemoveApi = (params) => {
  return defHttp.get({ url: Api.userRemove + params });
};

/**
 * @description: 用户回收列表
 */

export const userRecoveryListApi = (params) => {
  return defHttp.get({ url: Api.userRecovery, params });
};

/**
 * @description: 获取用户信息
 */

export const getUserInfoApi = () => {
  return defHttp.get({ url: Api.userInfo });
};

/**
 * @description: 发送短信
 */

export const userSendSmsApi = (params) => {
  return defHttp.get({ url: Api.userSendSms + params });
};
/**
 * @description: 手机登录短信
 */

export const userSendLoginSmsApi = (params) => {
  return defHttp.get({ url: Api.userSendLoginSms + params });
};
/**
 * @description: 冻结用户
 */
export const userFrozenApi = (params) => {
  return defHttp.get({ url: Api.userFrozen + params });
};
/**
 * @description: 解冻用户
 */
export const userThawApi = (params) => {
  return defHttp.get({ url: Api.userThaw + params });
};

// 注册用户
export const userRegisterApi = (params) => {
  return defHttp.post({ url: Api.userRegister, params });
};
// 找回密码验证码确认
export const userFindCodeApi = (params) => {
  return defHttp.post({ url: Api.userFindCode, params });
};
// 找回密码修改
export const userFindPasswordApi = (params) => {
  return defHttp.post({ url: Api.userFindPassword, params });
};

// 修改用户密码
export const userEditPassApi = (params) => {
  return defHttp.post({ url: Api.userEditPass, params });
};

// 修改用户基础信息
export const userEditInfoApi = (params) => {
  return defHttp.post({ url: Api.userEditInfo, params });
};
// 添加用户
export const userAddApi = (params) => {
  return defHttp.post({ url: Api.userAdd, params });
};
// 修改用户
export const userEditApi = (params) => {
  return defHttp.post({ url: Api.userEdit, params });
};
// 导出用户

export const exportUserApi = (params) => {
  return defHttpFile.get({ url: Api.exportUser + params, responseType: 'blob' });
};

//  导入用户
export function importUserApi(params: UploadFileParams) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: Api.importUser,
    },
    params,
  );
}

// 获取权限

export const getRoleIdsUserApi = () => {
  return defHttp.get({ url: Api.getRoleIdsUser });
};
export const getCodeByAccountApi = (account, tenantId) => {
  // return defHttp.get({ url: Api.getCodeByAccount + account + '/' + tenantId });
  return defHttp.get({ url: Api.sendSmsCode + account });
};
