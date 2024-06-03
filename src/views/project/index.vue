<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #toolbar>
        <a-button type="primary" v-if="showProjectModal" @click="handleCreate">
          完善项目信息
        </a-button>
        <a-button type="primary" @click="onRefresh"> 刷新项目数据 </a-button>
        <a-button type="primary" @click="exportExcel"> 下载 </a-button>
      </template>
      <!-- bodycell slot-->
      <template #controlStatus="{ record }">{{ controlStatus(record) }} </template>
      <template #planDate="{ record }">
        {{ record.planStartDate }} - {{ record.planEndDate }}
      </template>
      <template #projectProgress="{ record }"> {{ projectProgress(record) }} </template>
      <!-- action slot -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '里程碑配置',
              onClick: handleMilestoneConfig.bind(null, record),
              ifShow: [
                ControlStatusEnum.UNCONFIGURED,
                ControlStatusEnum.DELAY_CONFIGURATION,
              ].includes(record.controlStatus),
            },
            {
              label: '查看详情',
              onClick: handleDetail.bind(null, record),
              ifShow: record.controlStatus === ControlStatusEnum.CONTROL,
            },
            {
              label: '不需要管控',
              popConfirm: {
                title: '是否确认操作',
                confirm: handleControl.bind(null, record, false),
              },
              ifShow: record.controlStatus === ControlStatusEnum.TO_BE_JUDGED,
            },
            {
              label: '需要管控',
              popConfirm: {
                title: '是否确认操作',
                confirm: handleControl.bind(null, record, true),
              },
              ifShow: record.controlStatus === ControlStatusEnum.TO_BE_JUDGED,
            },
            {
              label: '延期配置',
              onClick: handleDeferConfig.bind(null, record),
              ifShow: record.controlStatus === ControlStatusEnum.DELAY_AUDIT,
            },
            {
              label: '结束管控',
              popConfirm: {
                title: '是否确认操作',
                confirm: handleControlBtn.bind(null, record, true),
              },
              ifShow: record.controlStatus === ControlStatusEnum.TO_BE_COMPLETED,
            },
            {
              label: '延期管控',
              popConfirm: {
                title: '是否确认操作',
                confirm: handleControlBtn.bind(null, record, false),
              },
              ifShow: record.controlStatus === ControlStatusEnum.TO_BE_COMPLETED,
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
  import {
    pageApi,
    controlDetermineApi,
    exportApi,
    controlEndApplyApi,
    controlExtensionApplyApi,
  } from '/@/api/project/project';
  import ProjectModal from './ProjectModal.vue';
  import { columns, searchFormSchema } from './project.data';
  import { computed, ref, unref } from 'vue';
  import { useModal } from '/@/components/Modal';
  import { useRouter } from 'vue-router';
  import {
    controlStatusOptions,
    projectProgressEnum,
    ControlStatusEnum,
  } from '/@/enums/projectControl';

  const router = useRouter();
  const showProjectModal = computed(() => {
    return getSelectRows().length && getSelectRows()[0].controlStatus === 1;
  });

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getSelectRows, clearSelectedRowKeys }] = useTable({
    title: '项目管理列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [['date', ['startDate', 'endDate'], 'YYYY-MM-DD']],
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
  // 创建项目管理
  const handleCreate = () => {
    // 项目负责人+运营部可见
    if (getSelectRows().length === 0) {
      message.error('请选择一个项目');
      return;
    }

    const { planStartDate, planEndDate } = getSelectRows()[0];
    const planDate = `${planStartDate} - ${planEndDate}`;
    console.log(getSelectRows()[0]);
    openModal(true, {
      ...getSelectRows()[0],
      isUpdate: true,
      planDate,
    });
  };
  const onRefresh = () => {
    reload();
  };
  // 枚举转换
  const projectProgress = (record) => {
    return projectProgressEnum[record.projectProgress ?? 0];
  };
  const controlStatus = (record) => {
    return controlStatusOptions[record.controlStatus ?? 0];
  };
  // 跳转详情
  const handleDetail = (record: Recordable) => {
    router.push({
      path: '/projectDetail',
      query: {
        id: record.id,
        warningStatus: record.warningStatus,
      },
    });
  };
  const handleMilestoneConfig = (record: Recordable) => {
    router.push({
      path: '/projectMilestoneConfig',
      query: {
        id: record.id,
        isDefer: 0,
      },
    });
  };
  // 编辑项目管理 Modal
  const handleEditModal = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: true,
    });
  };
  // 管控项目确认
  const handleControl = async (record: Recordable, isControl: Boolean) => {
    const { id } = record;
    await controlDetermineApi({ id, determineStatus: isControl ? 1 : 0 });
    message.success('操作成功');
    reload();
  };
  // 延期配置
  const handleDeferConfig = (record: Recordable) => {
    router.push({
      path: '/projectMilestoneConfig',
      query: {
        id: record.id,
        isDefer: 1,
      },
    });
  };
  // 结束或延期管控
  const handleControlBtn = async (record: Recordable, isFinish: Boolean) => {
    const { id } = record;
    if (isFinish) {
      await controlEndApplyApi(id);
    } else {
      await controlExtensionApplyApi(id);
    }
    message.success('操作成功');
    reload();
  };
  // 成功
  function handleSuccess() {
    clearSelectedRowKeys();
    reload();
  }

  let selectId = ref<string | null>(null);
  // 勾选事件触发
  const onSelectionChange = async (e) => {
    selectId.value = e.rows[0].id;
  };

  // 导出
  const exportExcel = async () => {
    try {
      let params = unref(selectId);
      console.log(params);
      const res = await exportApi(params);
      const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      message.success('导出成功');
    } catch (error) {}
  };
</script>

<style lang="less" scoped>
  :global(.ant-input-number) {
    width: 100%;
  }
  :global(.ant-calendar-picker, .ant-calendar-picker-default) {
    width: 100%;
  }
</style>
