<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="onAddExpenses"> 新增发生费用 </a-button>
        <a-button type="primary" @click="handleCreate" :disabled="!hasRowSelection">
          完善项目信息
        </a-button>
        <a-button type="primary" @click="exportExcel"> 下载 </a-button>
      </template>
      <!-- bodycell slot-->
      <template #planDate="{ record }">
        {{ record.planStartDate }} - {{ record.planEndDate }}
      </template>
      <template #projectProgress="{ record }"> {{ projectProgress(record) }} </template>
      <!-- action slot -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '不需要管控',
              onClick: handleEditModal.bind(null, record),
            },
            {
              label: '需要管控',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <ProjectModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { pageApi, removeApi, exportApi } from '/@/api/project/project';
  import ProjectModal from './ProjectModal.vue';
  import { columns, searchFormSchema } from './project.data';
  import { computed, unref } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useModal } from '/@/components/Modal';
  import { useRouter } from 'vue-router';
  import { projectProgressEnum } from '/@/enums/projectControl';
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getSelectRows, clearSelectedRowKeys }] = useTable({
    title: '项目管理列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    clickToRowSelect: false,
    rowSelection: {
      type: 'radio',
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
      width: 300,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  const { hasPermission } = usePermission();
  const hasRowSelection = computed(
    () => getSelectRows().length > 0 && getSelectRows()[0].disassembleStatus === 0,
  );
  // 创建项目管理
  const handleCreate = () => {
    const {
      projectName,
      projectOwnerName,
      planStartDate,
      planEndDate,
      deptName,
      id,
      generalBudget,
      projectArea,
      filingStatus,
      cooperationStatus,
    } = getSelectRows()[0];
    const planDate = `${planStartDate} - ${planEndDate}`;
    console.log(getSelectRows()[0]);
    openModal(true, {
      id,
      isUpdate: true,
      projectName,
      projectOwnerName,
      planDate,
      deptName,
      generalBudget,
      projectArea,
      filingStatus,
      cooperationStatus,
    });
  };

  const projectProgress = (record) => {
    return projectProgressEnum[record.projectProgress ?? 0];
  };

  // 编辑项目管理 Modal
  const handleEditModal = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: true,
    });
  };
  // 删除项目管理
  const handleDelete = async (record: Recordable) => {
    await removeApi(record.id);
    message.success('删除项目管理成功');
    reload();
  };
  // 成功
  function handleSuccess() {
    clearSelectedRowKeys();
    reload();
  }

  // 导出
  const exportExcel = async () => {
    try {
      let params = selectId.toString();
      const res = await exportApi(params);
      const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      message.success('导出成功');
    } catch (error) {}
  };

  // const go = useGo();
  const router = useRouter();

  /**
   * 新增发生费用
   * 如果跳转带有项目，则自动选择项目
   */
  const onAddExpenses = () => {
    router.push({
      path: '/project/expenses',
      query: {
        projectName: getSelectRows()[0]?.projectName,
      },
    });
  };
</script>
