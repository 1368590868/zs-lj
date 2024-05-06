<template>
  <BasicTable @register="registerTable">
    <template #form-fieldTime="{ model, field }">
      <DatePicker.RangePicker v-model:value="model[field]" show-time />
    </template>
    <template #logoutType="{ record }">
      <div>{{ filterStatus(record.logoutType) }}</div>
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { pageApi } from '/@/api/sys/sysLogout';
  import { columns, searchFormSchema } from './sysLoginLog.data';
  import { DatePicker } from 'ant-design-vue';

  const [registerTable] = useTable({
    title: '登录日志列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 70,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [['fieldTime', ['stime', 'etime']]],
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
  const filterStatus = (type) => {
    switch (type) {
      case 0:
        return '正常登出';
        break;
      case 1:
        return '挤下线';
        break;
    }
  };
</script>
