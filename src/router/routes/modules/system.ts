import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/user',
  meta: {
    orderNo: 20,
    icon: 'ion:settings-outline',
    title: t('routes.demo.system.moduleName'),
  },
  children: [
    {
      path: 'user',
      name: 'UserManagement',
      meta: {
        title: t('routes.demo.system.account'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/system/user/index.vue'),
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.demo.system.role'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/role/index.vue'),
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: t('routes.demo.system.menu'),
      },
      component: () => import('/@/views/system/menu/index.vue'),
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: t('routes.demo.system.dept'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/dept/index.vue'),
    },
    {
      path: 'dictionary',
      name: 'DataDictionary',
      meta: {
        title: t('routes.demo.system.data_dictionary'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/dictionary/index.vue'),
    },
    {
      path: 'notice',
      name: 'systemNotice',
      meta: {
        title: t('routes.demo.system.remind'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/notice/index.vue'),
    },
    {
      path: 'config',
      name: 'systemConfig',
      meta: {
        title: t('routes.demo.system.config'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/systemConfig/index.vue'),
    },
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

export default system;
