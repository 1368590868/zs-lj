import type { Router, RouteRecordRaw } from 'vue-router';

import { usePermissionStoreWithOut } from '/@/store/modules/permission';

import { PageEnum } from '/@/enums/pageEnum';
import { useUserStoreWithOut } from '/@/store/modules/user';

import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

import { RootRoute } from '/@/router/routes';
import { UNIT_LOGIN_CODE } from '/@/router/constant';

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const ROOT_PATH = RootRoute.path;
const ERROR_LOGIN_PATH = PageEnum.ERROR_PAGE;
const whitePathList: PageEnum[] = [LOGIN_PATH];
const isLoginPath = (path) => {
  return path && path.indexOf('/login/') === 0 && path != '/login/';
};

export function createPermissionGuard(router: Router) {
  // getSystemConfigAction();
  const userStore = useUserStoreWithOut();
  const permissionStore = usePermissionStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    if (
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    ) {
      next(userStore.getUserInfo.homePath);
      return;
    }

    const token = userStore.getToken;

    const token1 = sessionStorage.getItem('externalToken');
    if (token1) {
      userStore.setToken(token1);
      sessionStorage.removeItem('externalToken');
    }
    if (isLoginPath(to.path) && token) {
      // 自动进入首页1
      const isSessionTimeout = userStore.getSessionTimeout;
      try {
        await userStore.afterLoginAction();
        if (!isSessionTimeout) {
          next((to.query?.redirect as string) || '/');
          return;
        }
      } catch {}
    }
    if (isLoginPath(to.path)) {
      next();
    }
    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout;
        try {
          await userStore.afterLoginAction();
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/');
            return;
          }
        } catch {}
      }
      next();
      return;
    }

    // token 不存在
    if (!token) {
      // 您可以在没有token的情况下访问。您需要设置路由元。ignoreAuth为true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }
      const code: any = localStorage.getItem(UNIT_LOGIN_CODE);
      if (code) {
        // redirect login page
        const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
          path: LOGIN_PATH.replace(':code', code),
          // path: LOGIN_PATH,
          replace: true,
        };
        if (to.path) {
          redirectData.query = {
            ...redirectData.query,
            redirect: to.path,
          };
        } else {
          // 登录地址异常
          const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
            path: ERROR_LOGIN_PATH,
            replace: true,
          };
          next(redirectData);
        }
        next(redirectData);
      }
      return;
    }

    // Jump to the 404 page after processing the login
    if (
      from.path === LOGIN_PATH &&
      to.name === PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== (userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
    ) {
      next(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
      return;
    }

    // get userinfo while last fetch time is empty
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction();
      } catch (err) {
        next();
        return;
      }
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    const routes = await permissionStore.buildRoutesAction();

    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });

    router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);

    permissionStore.setDynamicAddedRoute(true);

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}
