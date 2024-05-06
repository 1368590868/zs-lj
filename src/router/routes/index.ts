import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';
import { LAYOUT } from '/@/router/constant';
import { mainOutRoutes } from './mainOut';
import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  // console.log(modList);
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login/:code',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};
export const systemRoute: AppRouteRecordRaw = {
  path: '/system',
  name: 'System1',
  component: LAYOUT,
  redirect: '/system/recycling1',
  meta: {
    orderNo: 20,
    icon: 'ion:settings-outline',
    title: t('routes.demo.system.moduleName'),
  },
  children: [
    {
      path: 'recycling',
      name: 'systemRecycling',
      meta: {
        title: '回收站',
        ignoreKeepAlive: true,
        hideMenu: true,
        hideBreadcrumb: true,
      },
      component: () => import('/@/views/system/recycling/index.vue'),
    },
    {
      path: 'account',
      name: 'systemAccount',
      meta: {
        title: '个人中心',
        ignoreKeepAlive: true,
        hideMenu: true,
        hideBreadcrumb: true,
      },
      component: () => import('/@/views/system/account/index.vue'),
    },
  ],
};
export const genRoute: AppRouteRecordRaw = {
  path: '/devManage',
  name: 'DevManage',
  component: LAYOUT,
  redirect: '/devManage/genConfig',
  meta: {
    orderNo: 20,
    icon: 'ion:settings-outline',
    title: t('routes.demo.system.moduleName'),
  },
  children: [
    {
      path: 'genConfig',
      name: 'genConfig',
      meta: {
        title: '修改生成配置',
        ignoreKeepAlive: true,
        hideMenu: true,
        hideBreadcrumb: true,
      },
      component: () => import('/@/views/devManage/genConfig/index.vue'),
    },
  ],
};
// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  systemRoute,
  genRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
