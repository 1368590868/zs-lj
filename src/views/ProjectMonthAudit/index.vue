<template>
  <div>
    <BasicTable @register="registerTable">
      <!-- Column slots -->
      <template #auditOpinion="{ record }">
        <a-button type="link" @click="handleDetailModal(record)">意见详情</a-button>
      </template>
      <template #costDetail="{ record }">
        <a-button type="link" @click="handleCostDetail(record)">查看详情</a-button>
      </template>
      <template #costLeaderStatus="{ record }">
        <ProjectLeaderStatus
          :text="record.costLeaderStatus"
          :id="record.id"
          @reload="reload"
          :time="record.costLeaderTime"
          :personCost="record.personCost"
          type="cost"
        />
      </template>
      <template #operationDeptStatus="{ record }">
        <ProjectLeaderStatus
          :text="record.operationDeptStatus"
          :costStatus="record.costLeaderStatus"
          :id="record.id"
          @reload="reload"
          :time="record.operationDeptTime"
          type="operation"
        />
      </template>
      <template #personCost="{ record }">
        <Space>
          <span v-if="record.personCost">
            {{ useCurrencyFormatter(record.personCost ?? 0) }}
          </span>
          <span v-if="record.personCost === 0"> 0.00 </span>

          <TableAction
            :actions="[
              {
                icon: 'ant-design:edit-outlined',
                ifShow:
                  typeof record.personCost === 'number' && [0, 3].includes(record.costLeaderStatus),
                onClick: onPersonCost.bind(null, record),
              },
              {
                label: '填写',
                ifShow: typeof record.personCost !== 'number',
                onClick: onPersonCost.bind(null, record),
              },
            ]"
          />
        </Space>
      </template>
    </BasicTable>
    <MyPhaseCostModal @register="registerModal" />
    <PersonCostModal @register="registerPersonCostModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { Space } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import MyPhaseCostModal from './ProjectMonthAuditModal.vue';
  import { columns, searchFormSchema, ProjectLeaderStatus } from './ProjectMonthAudit.data';

  import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';
  import { useModal } from '/@/components/Modal';
  import { pageApi } from '/@/api/projectMonthAudit/projectMonthAudit';
  import { useRouter } from 'vue-router';
  import PersonCostModal from './personCostModal.vue';
  const [registerModal, { openModal }] = useModal();
  const [registerPersonCostModal, { openModal: openPersonCost }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: pageApi,
    columns,
    rowKey: 'id',
    formConfig: {
      labelWidth: 120,
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

  // 编辑项目阶段成本明细 Modal
  const handleDetailModal = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: true,
    });
  };
  const onPersonCost = (record: Recordable) => {
    openPersonCost(true, {
      record,
    });
  };
  // 成功
  function handleSuccess() {
    reload();
  }

  const router = useRouter();
  const handleCostDetail = (record: Recordable) => {
    router.push({
      path: '/ProjectReviewCostDetail',
      query: {
        projectId: record.projectId,
      },
    });
  };
</script>
