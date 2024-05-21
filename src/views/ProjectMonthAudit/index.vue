<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #toolbar>
        <a-button type="primary" @click="onBatchReject" :disabled="!isSelectRows">
          批量驳回
        </a-button>
        <a-button type="primary" @click="onBatchPass" :disabled="!isSelectRows">
          批量通过
        </a-button>
      </template>
      <template #auditOpinion="{ record }">
        <a-button type="link" @click="handleDetailModal(record)">意见详情</a-button>
      </template>
      <!-- Column slots -->
      <template #costDetail="{ record }">
        <a-button type="link" @click="handleEditModal(record)">查看详情</a-button>
      </template>
    </BasicTable>
    <MyPhaseCostModal @register="registerModal" />
    <MyPhaseEditModal @register="registerEditModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { Modal, message } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { auditApi, removeApi } from '/@/api/projectPhaseCost/projectPhaseCost';
  import MyPhaseCostModal from './ProjectMonthAuditModal.vue';
  import { columns, searchFormSchema, ProjectLeaderStatus } from './ProjectMonthAudit.data';
  import { computed, reactive } from 'vue';
  import { useModal } from '/@/components/Modal';
  import MyPhaseEditModal from './ProjectMonthAuditEditModal.vue';
  import { pageApi } from '/@/api/projectMonthAudit/projectMonthAudit';
  const [registerModal, { openModal }] = useModal();
  const [registerEditModal, { openModal: openEditModal }] = useModal();
  const [registerTable, { reload, getSelectRowKeys, getSelectRows }] = useTable({
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
    rowSelection: {
      type: 'checkbox',
    },
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  let selectId = reactive<any[]>([]);
  const isSelectRows = computed(() => {
    return getSelectRows().length > 0;
  });

  // 编辑项目阶段成本明细 Modal
  const handleDetailModal = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: true,
    });
  };
  const handleEditModal = (record: Recordable) => {
    openEditModal(true, {
      record,
    });
  };
  const handleDelete = async (record: Recordable) => {
    try {
      await removeApi(record.id);
      message.success('删除成功');
      reload();
    } catch (error) {}
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

  const onBatchReject = () => {
    console.log(getSelectRowKeys(), getSelectRowKeys());
    Modal.confirm({
      title: '提示',
      content: '确定批量驳回吗？',
      onOk: async () => {
        await auditApi({
          ids: getSelectRowKeys(),
          projectLeaderStatus: 2,
        });
        message.success('批量驳回成功');
        reload();
      },
    });
  };
  const onBatchPass = () => {
    Modal.confirm({
      title: '提示',
      content: '确定批量通过吗？',
      onOk: async () => {
        await auditApi({
          ids: getSelectRowKeys(),
          projectLeaderStatus: 1,
        });
        message.success('批量通过成功');
        reload();
      },
    });
  };
</script>