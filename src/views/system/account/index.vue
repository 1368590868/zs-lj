<template>
  <ScrollContainer>
    <div ref="wrapperRef" :class="prefixCls">
      <Tabs tab-position="left" :tabBarStyle="tabBarStyle">
        <template v-for="item in settingList" :key="item.key">
          <TabPane :tab="item.name">
            <component :is="item.component" />
          </TabPane>
        </template>
      </Tabs>
    </div>
  </ScrollContainer>
</template>

<script lang="ts" setup>
  import { Tabs, TabPane } from 'ant-design-vue';
  import { ScrollContainer } from '/@/components/Container/index';
  import BaseSetting from './BaseSetting.vue';
  import SecureSetting from './SecureSetting.vue';
  import { markRaw, reactive } from 'vue';

  type tabType = {
    key: string;
    name: string;
    component: any;
  };

  const settingList = reactive<tabType[]>([
    {
      key: '1',
      name: '基本设置',
      component: markRaw(BaseSetting),
    },
    {
      key: '2',
      name: '安全设置',
      component: markRaw(SecureSetting),
    },
  ]);
  const prefixCls = 'account-setting';
  const tabBarStyle = {
    width: '100px',
  };
</script>
<style lang="less">
  .account-setting {
    margin: 12px;
    background-color: @component-background;

    .base-title {
      padding-left: 0;
    }

    .ant-tabs-tab-active {
      background-color: @item-active-bg;
    }
  }
</style>
