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
          @reload="handleSuccess"
          :time="record.projectLeaderTime"
          :record="record"
        />
      </template>
    </BasicTable>
    <MyPhaseCostModal @register="registerModal" />
  </div>
</template>
<script lang="ts" setup>
  import { Modal, message } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { pageApi, auditApi, exportApi } from '/@/api/projectPhaseCost/projectPhaseCost';
  import MyPhaseCostModal from './projectPhaseCostDetailModal.vue';
  import { columns, searchFormSchema, ProjectLeaderStatus } from './projectPhaseCostDetail.data';
  import { computed, onMounted, reactive, ref } from 'vue';
  import { useModal } from '/@/components/Modal';
  import { useProjectControl } from '/@/store/modules/projectControl';
  import { ProjectRoleEnum } from '/@/enums/projectControl';
  import { debounce } from 'lodash-es';
  import { useUserStore } from '/@/store/modules/user';

  const projectStore = useProjectControl();
  const store = useUserStore();
  const searchParams = ref({});
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
        actionColOptions: {
          span: 4,
        },
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
      indexColumnProps: {
        title: '序号',
        width: 100,
      },
      immediate: false,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: true,
      clickToRowSelect: false,
      rowSelection: {
        type: 'checkbox',
        getCheckboxProps: (record) => {
          return {
            disabled:
              record.projectLeaderStatus !== 0 ||
              !record.projectOwnerNumber.split(',').includes(projectStore.userCode),
          };
        },
      },
      pagination: {
        current: 1,
        pageSize: 10,
      },
    });

  onMounted(async () => {
    await projectStore.setUserHasRoleKey();
    if (
      projectStore.hasRoles(ProjectRoleEnum.XMFZR) ||
      projectStore.hasRoles(ProjectRoleEnum.CBFZR)
    ) {
      await projectStore.setUserCode().finally(reload);
    } else {
      reload();
    }
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
    Modal.confirm({
      title: '提示',
      content: '确定批量驳回吗？',
      onOk: async () => {
        await auditApi({
          ids: getSelectRowKeys(),
          projectLeaderStatus: 2,
          nickName: store.getUserInfo.nickName,
          addProjectPhaseCostAudit: true,
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
          nickName: store.getUserInfo.nickName,
          addProjectPhaseCostAudit: true,
        });
        message.success('批量通过成功');
        handleSuccess();
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
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = url;
      tempLink.setAttribute('download', '项目支出统计.xlsx');
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
      }
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
      message.success('导出成功');
    } catch (error) {}
  };
</script>
