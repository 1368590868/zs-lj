<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { onMounted } from 'vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';

  // support Multi-language
  const { getAntdLocale } = useLocale();

  // Listening to page changes and dynamically changing site titles
  useTitle();
  onMounted(() => {
    const items: any = localStorage.getItem('systemConfig');
    let systemConfigs: any;
    if (items && items != 'undefined') {
      systemConfigs = JSON.parse(items);
      let link: any = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = systemConfigs?.configSystemLogoMix;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  });
</script>
