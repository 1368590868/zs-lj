export enum PageEnum {
  // basic login path
  BASE_LOGIN = '/login/:code',
  // basic home path
  BASE_HOME = '/dashboard',
  // error page path
  ERROR_PAGE = '/exception',
  // error log page path
  ERROR_LOG_PAGE = '/error-log/list',
  // 登录地址的code无效或没有
  ERROR_LOGIN_PATH = '/login-fail',
}
