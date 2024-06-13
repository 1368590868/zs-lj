<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '详情',
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
  import moment from 'moment';
  import { findYearAndMothApi } from '/@/api/projectOutputValue/projectOutputValue';
  const router = useRouter();
  const [registerTable, { reload }] = useTable({
    api: findYearAndMothApi,
    columns,
    formConfig: {
      labelWidth: 120,
      colon: true,
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
      title: '详情',
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
        outputValueMonth: moment(`${record.year}-${record.month}`).format('YYYY-MM') + '-26',
      },
    });
  };
  const onSelectionChange = async (e) => {
    selectId = reactive<any[]>([]);
    e.rows.forEach((it) => {
      selectId.push(it.id);
    });
  };
</script>
