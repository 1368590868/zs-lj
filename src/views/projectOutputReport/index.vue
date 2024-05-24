<template>
  <div>
    <BasicTable
      @register="registerTable"
      @selection-change="onSelectionChange"
      :beforeEditSubmit="beforeEditSubmit"
    >
      <template #toolbar>
        <a-button type="primary" @click="exportExcel"> 下载 </a-button>
      </template>
    </BasicTable>
    <ProjectPhaseModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import ProjectPhaseModal from './projectOutputReportModal.vue';
  import { columns, searchFormSchema } from './projectOutputReport.data';
  import { reactive } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useModal } from '/@/components/Modal';
  import { useRouter } from 'vue-router';
  import { exportApi, pageApi } from '/@/api/projectOutputValue/projectOutputValue';
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
  });
  const { hasPermission } = usePermission();
  let selectId = reactive<any[]>([]);

  // 成功
  function handleSuccess() {
    reload();
  }

  async function beforeEditSubmit({ record, index, key, value }) {
    console.log('单元格数据正在准备提交', { record, index, key, value });
  }

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
