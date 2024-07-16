<template>
  <div>
    <PageWrapper title="项目日志">
      <Card>
        <BasicTable @register="registerTable" :canResize="false" />
      </Card>
    </PageWrapper>
  </div>
  <div class="h-[65px]"></div>
  <BottomBar :customStyle="{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }"
    ><a-button @click="onGoBack">返回</a-button></BottomBar
  >
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { Card } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { getLogsApi } from '/@/api/project/project';
  import { useRouter } from 'vue-router';
  import { basicColumns } from './projectLogs.data';
  import BottomBar from '/@/components/BottomBar/index.vue';

  const router = useRouter();

  // 项目操作日志
  const [registerTable] = useTable({
    api: getLogsApi,
    searchInfo: {
      projectId: router.currentRoute.value.query.id,
    },
    columns: basicColumns,
    pagination: { pageSize: 10 },
  });

  const onGoBack = () => {
    router.go(-1);
  };
</script>
