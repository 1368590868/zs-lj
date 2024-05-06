<template>
  <BasicTable @register="registerTable">
    <template #form-fieldTime="{ model, field }">
      <DatePicker.RangePicker v-model:value="model[field]" show-time />
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { pageApi } from '/@/api/sys/sysOperateLog';
  import { columns, searchFormSchema } from './sysOperateLog.data';
  import { DatePicker } from 'ant-design-vue';
  const [registerTable] = useTable({
    title: '操作日志列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 70,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [['fieldTime', ['stime', 'etime'], 'YYYY-MM-DD HH:mm:ss']],
    },
    clickToRowSelect: false,
    rowSelection: {
      type: 'checkbox',
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
</script>
