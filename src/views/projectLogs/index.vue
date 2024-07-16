<template>
  <div style="min-height: 89vh">
    <PageWrapper title="项目日志">
      <Card>
        <BasicTable @register="registerTable" :canResize="false" />
      </Card>
    </PageWrapper>
  </div>

  <div class="vben-layout-content full bg-white p-4" style="position: sticky; bottom: 0"
    ><a-button class="ml-auto" style="display: block" @click="onGoBack">返回</a-button></div
  >
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { Card } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { getLogsApi } from '/@/api/project/project';
  import { useRouter } from 'vue-router';
  import { basicColumns } from './projectLogs.data';

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
