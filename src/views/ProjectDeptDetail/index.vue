<template>
  <div>
    <BasicTable @register="registerTable">
      <template #redWarning="{ record }">
        <TypographyText
          class="cursor-pointer"
          @click="onGoDetail(record, WarningStatusEnum.RED)"
          type="success"
          >{{ record.redWarning ?? 0 }}</TypographyText
        >
      </template>
      <template #yellowWarning="{ record }">
        <TypographyText
          class="cursor-pointer"
          @click="onGoDetail(record, WarningStatusEnum.YELLOW)"
          type="success"
          >{{ record.yellowWarning ?? 0 }}</TypographyText
        >
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { TypographyText } from 'ant-design-vue';
  import { columns, searchFormSchema } from './projectDeptDetail.data';
  import { deptProjectStatisticsApi } from '/@/api/project/project';
  import { useRouter } from 'vue-router';
  import { WarningStatusEnum } from '/@/enums/projectControl';

  const router = useRouter();
  const [registerTable] = useTable({
    api: deptProjectStatisticsApi,
    columns,
    rowKey: 'id',
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [['submitDate', ['submitStartDate', 'submitEndDate'], 'YYYY-MM-DD']],
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    clickToRowSelect: false,
    rowSelection: {
      type: 'checkbox',
    },
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const onGoDetail = (record: Recordable, warningStatus: string) => {
    router.push({
      path: '/projectControl',
      query: {
        deptNumber: record.deptNumber,
        warningStatus,
      },
    });
  };
</script>
