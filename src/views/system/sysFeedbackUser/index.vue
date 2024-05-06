<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <Tabs size="small" v-model:activeKey="activeKey">
      <TabPane key="1" tab="用户反馈"> <FeedbackUser /> </TabPane>
      <TabPane key="2" tab="优化建议"> <Proposal /> </TabPane>
    </Tabs>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { Tabs, TabPane } from 'ant-design-vue';
  import FeedbackUser from './components/feedbackUser/index.vue';
  import Proposal from './components/proposal/index.vue';
  import { ref } from 'vue';

  const activeKey = ref('1');
</script>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '/sysFeedbackUser',
  });
</script>
