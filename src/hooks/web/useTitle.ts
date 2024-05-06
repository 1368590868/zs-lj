import { watch, unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { useTitle as usePageTitle } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useLocaleStore } from '/@/store/modules/locale';

import { REDIRECT_NAME } from '/@/router/constant';
const items: any = localStorage.getItem('systemConfig');
let systemConfigs: any;
if (items && items != 'undefined') {
  systemConfigs = JSON.parse(items);
}

/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
  const title = systemConfigs?.configTitle;
  const { t } = useI18n();
  const { currentRoute } = useRouter();
  const localeStore = useLocaleStore();

  const pageTitle = usePageTitle();

  watch(
    [() => currentRoute.value.path, () => localeStore.getLocale],
    () => {
      const route = unref(currentRoute);

      if (route.name === REDIRECT_NAME) {
        return;
      }

      const tTitle = t(route?.meta?.title as string);
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
    },
    { immediate: true },
  );
}
