<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <Tabs size="small" v-model:activeKey="activeKey">
      <TabPane key="1" tab="操作日志"> <SysOperateLog /> </TabPane>
      <TabPane key="2" tab="登录日志"> <SysLoginLog /> </TabPane>
      <TabPane key="3" tab="登出日志"> <sysLogoutLog /> </TabPane>
      <TabPane key="4" tab="异常日志"> <SysErrorLog /> </TabPane>
    </Tabs>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { Tabs, TabPane } from 'ant-design-vue';
  import SysErrorLog from './components/sysErrorLog/index.vue';
  import SysLoginLog from './components/sysLoginLog/index.vue';
  import sysLogoutLog from './components/sysLogoutLog/index.vue';
  import SysOperateLog from './components/sysOperateLog/index.vue';
  import { ref } from 'vue';

  const activeKey = ref('1');
</script>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '/log',
  });
</script>
