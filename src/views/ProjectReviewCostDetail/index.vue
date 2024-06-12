<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <!-- <template #toolbar>
        <a-button type="primary" @click="onBatchReject" :disabled="!isSelectRows">
          批量驳回
        </a-button>
        <a-button type="primary" @click="onBatchPass" :disabled="!isSelectRows">
          批量通过
        </a-button>
      </template> -->
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
  import { pageApi } from '/@/api/projectPhaseCost/projectPhaseCost';
  import ProjectReviewCostDetailModal from './projectReviewCostDetailModal.vue';
  import { columns, searchFormSchema, ProjectLeaderStatus } from './projectReviewCostDetail.data';
  import { reactive } from 'vue';
  import { useModal } from '/@/components/Modal';
  import ProjectReviewCostEditModal from './projectReviewCostEditModal.vue';
  import { useRouter } from 'vue-router';
  const [registerModal, { openModal }] = useModal();
  const [registerEditModal, { openModal: openEditModal }] = useModal();
  const router = useRouter();
  const [registerTable, { reload }] = useTable({
    api: pageApi,
    searchInfo: {
      projectId: router.currentRoute.value.query.projectId,
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
</script>
