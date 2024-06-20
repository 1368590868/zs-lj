<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #toolbar>
        <a-button type="primary" @click="debounceExportExcel"> 下载 </a-button>
      </template>
      <template #auditOpinion="{ record }">
        <a-button type="link" @click="handleDetailModal(record)">详情</a-button>
      </template>
      <!-- Column slots -->
      <template #projectLeaderStatus="{ record }">
        <ProjectLeaderStatus
          :text="record.projectLeaderStatus"
          :id="record.id"
          @reload="reload"
          :time="record.projectLeaderTime"
        />
      </template>
    </BasicTable>
    <ProjectReviewCostDetailModal @register="registerModal" />
    <ProjectReviewCostEditModal @register="registerEditModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { pageApi, exportApi } from '/@/api/projectPhaseCost/projectPhaseCost';
  import ProjectReviewCostDetailModal from './projectReviewCostDetailModal.vue';
  import { columns, searchFormSchema, ProjectLeaderStatus } from './projectReviewCostDetail.data';
  import { reactive, ref } from 'vue';
  import { useModal } from '/@/components/Modal';
  import ProjectReviewCostEditModal from './projectReviewCostEditModal.vue';
  import { useRouter } from 'vue-router';
  import { debounce } from 'lodash-es';
  import { message } from 'ant-design-vue';

  const searchParams = ref({});
  const [registerModal, { openModal }] = useModal();
  const [registerEditModal, { openModal: openEditModal }] = useModal();
  const router = useRouter();
  const [registerTable, { reload }] = useTable({
    api: pageApi,
    searchInfo: {
      projectId: router.currentRoute.value.query.projectId,
    },
    beforeFetch: (info) => {
      if (!info.minMonthBudget) {
        info.minMonthBudget = 0;
      }
      if (!info.maxMonthBudget) {
        info.maxMonthBudget = 999999999;
      }
      searchParams.value = info;
      return {
        ...info,
      };
    },
    columns,
    rowKey: 'id',
    formConfig: {
      labelWidth: 120,
      colon: true,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [
        ['date', ['startDate', 'endDate'], 'YYYY-MM-DD'],
        ['costSubmitTime', ['submitStartDate', 'submitEndDate'], 'YYYY-MM-DD'],
      ],
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    clickToRowSelect: false,
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  let selectId = reactive<any[]>([]);

  // 编辑项目阶段成本明细 Modal
  const handleDetailModal = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: true,
    });
  };
  // 成功
  function handleSuccess() {
    reload();
  }
  const onSelectionChange = async (e) => {
    selectId = reactive<any[]>([]);
    e.rows.forEach((it) => {
      selectId.push(it.id);
    });
  };
  const debounceExportExcel = debounce(
    () => {
      exportExcel();
    },
    1000,
    { leading: true, trailing: false },
  );
  // 导出
  const exportExcel = async () => {
    try {
      const res = await exportApi(searchParams.value);
      const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      message.success('导出成功');
    } catch (error) {}
  };
</script>
