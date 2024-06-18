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
        <a-button type="link" @click="handleDetailModal(record)">详情</a-button>
      </template>
      <!-- Column slots -->
      <template #projectLeaderStatus="{ record }">
        <ProjectLeaderStatus
          :text="record.projectLeaderStatus"
          :id="record.id"
          @reload="handleSuccess"
          :time="record.projectLeaderTime"
        />
      </template>
    </BasicTable>
    <MyPhaseCostModal @register="registerModal" />
  </div>
</template>
<script lang="ts" setup>
  import { Modal, message } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { pageApi, auditApi, removeApi } from '/@/api/projectPhaseCost/projectPhaseCost';
  import MyPhaseCostModal from './projectPhaseCostDetailModal.vue';
  import { columns, searchFormSchema, ProjectLeaderStatus } from './projectPhaseCostDetail.data';
  import { computed, onMounted, reactive } from 'vue';
  import { useModal } from '/@/components/Modal';
  import { useProjectControl } from '/@/store/modules/projectControl';

  const projectStore = useProjectControl();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getSelectRowKeys, getSelectRows, clearSelectedRowKeys }] =
    useTable({
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
      searchInfo: {
        projectOwnerNumber: projectStore.userCode,
        costOwnerNumber: projectStore.userCode,
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

  onMounted(() => {
    projectStore.setUserCode();
  });

  function handleSummary(tableData: Recordable[]) {
    const totalPhaseBudget = tableData.reduce((prev, next) => {
      prev += next.phaseBudget;
      return prev;
    }, 0);
    console.log(totalPhaseBudget);
    return [
      {
        _row: '合计',
        phaseBudget: totalPhaseBudget,
      },
    ];
  }

  let selectId = reactive<any[]>([]);
  const isSelectRows = computed(() => {
    // 遍历选中的行，状态为待审核的才能操作
    return (
      getSelectRows().length > 0 && getSelectRows().every((it) => it.projectLeaderStatus === 0)
    );
  });

  // 编辑项目阶段成本明细 Modal
  const handleDetailModal = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: true,
    });
  };
  // 成功
  function handleSuccess() {
    // 如果驳回成功后，判断当前数据是否勾选，如果勾选则清除
    if (selectId.length > 0) {
      clearSelectedRowKeys();
    }
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
        handleSuccess();
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
        handleSuccess();
      },
    });
  };
</script>
