<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="debounceExportExcel"> 下载 </a-button>
      </template>
      <!-- Column slots -->
      <template #auditOpinion="{ record }">
        <a-button type="link" @click="handleDetailModal(record)">详情</a-button>
      </template>
      <template #costDetail="{ record }">
        <a-button type="link" @click="handleCostDetail(record)">详情</a-button>
      </template>
      <template #costLeaderStatus="{ record }">
        <ProjectLeaderStatus
          :text="record.costLeaderStatus"
          :id="record.id"
          @reload="reload"
          :time="record.costLeaderTime"
          :personCost="record.personCost"
          :record="record"
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
          :record="record"
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
                  typeof record.personCost === 'number' &&
                  [0, 3].includes(record.costLeaderStatus) &&
                  projectStore.hasRoles(ProjectRoleEnum.CBFZR),
                onClick: onPersonCost.bind(null, record),
              },
              {
                label: '填写',
                ifShow:
                  typeof record.personCost !== 'number' &&
                  projectStore.hasRoles(ProjectRoleEnum.CBFZR),
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
  import { Space, message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import MyPhaseCostModal from './projectMonthAuditModal.vue';
  import { columns, searchFormSchema, ProjectLeaderStatus } from './projectMonthAudit.data';
  import { ProjectRoleEnum } from '/@/enums/projectControl';
  import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';
  import { useModal } from '/@/components/Modal';
  import { pageApi, exportApi } from '/@/api/projectMonthAudit/projectMonthAudit';
  import { useRouter } from 'vue-router';
  import PersonCostModal from './personCostModal.vue';
  import { onMounted, ref } from 'vue';
  import { useProjectControl } from '/@/store/modules/projectControl';
  import { debounce } from 'lodash-es';

  const projectStore = useProjectControl();
  const searchParams = ref({});
  const [registerModal, { openModal }] = useModal();
  const [registerPersonCostModal, { openModal: openPersonCost }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: pageApi,
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
    beforeFetch: (info) => {
      const searchs = {
        ...info,
        projectOwnerNumber:
          projectStore.hasRoles(ProjectRoleEnum.LEADER) ||
          projectStore.hasRoles(ProjectRoleEnum.YYB)
            ? null
            : projectStore.userCode,
        costOwnerNumber:
          projectStore.hasRoles(ProjectRoleEnum.LEADER) ||
          projectStore.hasRoles(ProjectRoleEnum.YYB)
            ? null
            : projectStore.userCode,
      };
      searchParams.value = searchs;
      return searchs;
    },
    immediate: false,
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

  onMounted(async () => {
    await projectStore.setUserHasRoleKey();
    await projectStore.setUserCode().finally(reload);
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
      path: '/projectReviewCostDetail',
      query: {
        projectId: record.projectId,
      },
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
