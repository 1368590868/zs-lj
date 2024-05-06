<template>
  <div>
    <Tabs v-model:activeKey="activeKey" class="bg-white">
      <TabPane key="1" tab="基本信息"
        ><BaseInfo :basicInfo="basicInfo" :dsName="dsName" :tableName="tableName"
      /></TabPane>
      <TabPane key="2" tab="字段信息"><FieldInfo :columnInfos="columnInfos" /></TabPane>
      <TabPane key="3" tab="生成信息"><GenerateInfo :genInfo="genInfo" /></TabPane>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
  import { Tabs, TabPane } from 'ant-design-vue';
  import BaseInfo from './baseInfo.vue';
  import FieldInfo from './fieldInfo.vue';
  import GenerateInfo from './generateInfo.vue';
  import { ref } from 'vue';
  const activeKey = ref('2');
  const basicInfo = ref();
  const genInfo = ref();
  const dsName = ref();
  const tableName = ref();
  const columnInfos: any = ref();
</script>

<style scoped></style>
