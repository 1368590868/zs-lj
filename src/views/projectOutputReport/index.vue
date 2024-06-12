<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #toolbar>
        <a-button type="primary" @click="exportExcel"> 下载 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '修改',
              onClick: onDetail.bind(null, record, ActionType.ADD),
              ifShow: !!record.updateBy,
            },
            {
              label: '编辑',
              onClick: onDetail.bind(null, record, ActionType.EDIT),
              ifShow: !record.updateBy,
            },
            {
              label: '查看',
              onClick: onDetail.bind(null, record, ActionType.VIEW),
              ifShow: isBetween(record) && !!record.updateBy,
            },
          ]"
        />
      </template>
    </BasicTable>
    <ProjectPhaseModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import ProjectPhaseModal from './projectOutputReportModal.vue';
  import { columns, searchFormSchema, ActionType } from './projectOutputReport.data';
  import { reactive } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useModal } from '/@/components/Modal';
  import { useRouter } from 'vue-router';
  import { exportApi, pageApi } from '/@/api/projectOutputValue/projectOutputValue';
  import { useProjectControl } from '/@/store/modules/projectControl';
  import moment from 'moment';
  const router = useRouter();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: pageApi,
    columns,
    searchInfo: {
      outputValueMonth: router.currentRoute.value.query.outputValueMonth,
    },
    formConfig: {
      labelWidth: 120,
      colon: true,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      fixed: 'left',
    },
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const { hasPermission } = usePermission();
  let selectId = reactive<any[]>([]);

  // 成功
  function handleSuccess() {
    reload();
  }

  const store = useProjectControl();
  const onDetail = (record, type) => {
    store.setReportData(record);
    router.push({ path: '/projectReportDetail', query: { type } });
  };
  const isBetween = (record) => {
    if (!record.outputValueMonth) return false;
    const backendDate = record.outputValueMonth;
    // 将后端返回的日期转换为 Moment 对象
    const outputDate = moment(backendDate, 'YYYY-MM-DD');
    // 获取当前日期
    const currentDate = moment();
    // 计算返回日期加一个月的日期
    const nextMonthDate = outputDate.clone().add(1, 'month');
    // 判断当前日期是否在返回日期和返回日期加一个月之间
    return currentDate.isBetween(outputDate, nextMonthDate, null, '[)');
  };
  // 导出
  const exportExcel = async () => {
    try {
      let params = selectId.toString();
      const res = await exportApi(params);
      const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      window.open(url, '_blank');
      message.success('导出成功');
    } catch (error) {}
  };
  const onSelectionChange = async (e) => {
    selectId = reactive<any[]>([]);
    e.rows.forEach((it) => {
      selectId.push(it.id);
    });
  };
</script>
