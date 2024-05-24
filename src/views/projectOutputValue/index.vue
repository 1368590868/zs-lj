<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '查看详情',
              onClick: handleDetail.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './projectOutputValue.data';
  import { reactive } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useRouter } from 'vue-router';
  import { findYearAndMothApi } from '/@/api/projectOutputValue/projectOutputValue';
  const router = useRouter();
  const [registerTable, { reload }] = useTable({
    api: findYearAndMothApi,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    pagination: {
      current: 1,
      pageSize: 10,
    },
    actionColumn: {
      width: 120,
      title: '查看详情',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  const { hasPermission } = usePermission();
  let selectId = reactive<any[]>([]);

  // 跳转里程碑详情
  const handleDetail = (record: Recordable) => {
    router.push({
      path: '/projectOutputReport',
      query: {
        outputValueMonth: replacedString(`${record.year}-${record.month}-26`),
      },
    });
  };
  const onSelectionChange = async (e) => {
    selectId = reactive<any[]>([]);
    e.rows.forEach((it) => {
      selectId.push(it.id);
    });
  };
  const replacedString = (day: string) => {
    const month = day.split('-')[1];
    return day.replace(month, month.length === 1 ? `0${month}` : month);
  };
</script>
