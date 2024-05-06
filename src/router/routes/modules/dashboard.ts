import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.analysis'),
    orderNo: 10,
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/views/dashboard/analysis/index.vue'),
      meta: {
        title: t('routes.dashboard.analysis'),
        icon: 'ion:grid-outline',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
