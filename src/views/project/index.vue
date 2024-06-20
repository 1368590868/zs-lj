<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #toolbar>
        <a-button type="primary" @click="onRefresh"> 刷新项目数据 </a-button>
        <a-button type="primary" @click="debounceExportExcel"> 下载 </a-button>
      </template>
      <!-- bodycell slot-->
      <template #controlStatus="{ record }"
        ><TypographyText
          :type="
            [+ControlStatusEnum.NONE, +ControlStatusEnum.END].includes(record.controlStatus)
              ? 'secondary'
              : [+ControlStatusEnum.END_AUDIT, +ControlStatusEnum.DELAY_AUDIT].includes(
                  record.controlStatus,
                )
              ? 'danger'
              : undefined
          "
          >{{ controlStatusOptions[record.controlStatus ?? 0] }}</TypographyText
        >
      </template>
      <template #planDate="{ record }">
        {{ record.planStartDate }} - {{ record.planEndDate }}
      </template>
      <template #projectProgress="{ record }"> {{ projectProgress(record) }} </template>
      <!-- action slot -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '完善项目信息',
              onClick: handleCreate.bind(null, record),
              ifShow:
                projectStore.hasRoles(ProjectRoleEnum.XMFZR) &&
                [+ControlStatusEnum.UNCONFIGURED].includes(record.controlStatus),
            },
            {
              label: '里程碑配置',
              onClick: handleMilestoneConfig.bind(null, record),
              ifShow:
                [+ControlStatusEnum.UNCONFIGURED].includes(record.controlStatus) &&
                projectStore.hasRoles(ProjectRoleEnum.XMFZR),
            },
            {
              label: '不管控',
              popConfirm: {
                title: '是否确认操作',
                confirm: handleControl.bind(null, record, false),
              },
              ifShow:
                record.controlStatus === +ControlStatusEnum.TO_BE_JUDGED &&
                projectStore.hasRoles(ProjectRoleEnum.CBFZR),
            },
            {
              label: '管控',
              popConfirm: {
                title: '是否确认操作',
                confirm: handleControl.bind(null, record, true),
              },
              ifShow:
                record.controlStatus === +ControlStatusEnum.TO_BE_JUDGED &&
                projectStore.hasRoles(ProjectRoleEnum.CBFZR),
            },
            {
              label: '延期配置',
              onClick: handleDeferConfig.bind(null, record),
              ifShow:
                record.controlStatus === +ControlStatusEnum.DELAY_CONFIGURATION &&
                projectStore.hasRoles(ProjectRoleEnum.XMFZR),
            },
            {
              label: '结束管控',
              popConfirm: {
                title: '是否确认操作',
                confirm: handleControlBtn.bind(null, record, true),
              },
              ifShow:
                record.controlStatus === +ControlStatusEnum.TO_BE_COMPLETED &&
                projectStore.hasRoles(ProjectRoleEnum.XMFZR),
            },
            {
              label: '延期管控',
              popConfirm: {
                title: '是否确认操作',
                confirm: handleControlBtn.bind(null, record, false),
              },
              ifShow:
                record.controlStatus === +ControlStatusEnum.TO_BE_COMPLETED &&
                projectStore.hasRoles(ProjectRoleEnum.XMFZR),
            },
            {
              label: '详情',
              onClick: handleDetail.bind(null, record),
              ifShow: ![
                +ControlStatusEnum.NONE,
                +ControlStatusEnum.UNCONFIGURED,
                +ControlStatusEnum.TO_BE_JUDGED,
              ].includes(record.controlStatus),
            },
          ]"
        />
      </template>
    </BasicTable>
    <ProjectModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { TypographyText, message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    pageApi,
    controlDetermineApi,
    exportApi,
    controlEndApplyApi,
    controlExtensionApplyApi,
    refreshProjectApi,
    editApi,
  } from '/@/api/project/project';
  import ProjectModal from './projectModal.vue';
  import { columns, searchFormSchema } from './project.data';
  import { computed, onMounted, ref, unref } from 'vue';
  import { useModal } from '/@/components/Modal';
  import { useRouter } from 'vue-router';
  import {
    controlStatusOptions,
    projectProgressOptions,
    ControlStatusEnum,
    ProjectRoleEnum,
  } from '/@/enums/projectControl';
  import { useUserStore } from '/@/store/modules/user';
  import { debounce } from 'lodash-es';
  import { useProjectControl } from '/@/store/modules/projectControl';

  const router = useRouter();
  const projectStore = useProjectControl();
  const searchParams = ref({});

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getSelectRows, clearSelectedRowKeys }] = useTable({
    title: '项目管理列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 120,
      colon: true,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [['date', ['startDate', 'endDate'], 'YYYY-MM-DD']],
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
    clickToRowSelect: false,
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
  const handleCreate = (record) => {
    const { planStartDate, planEndDate } = record;
    const planDate = `${planStartDate} - ${planEndDate}`;

    openModal(true, {
      ...record,
      isUpdate: true,
      planDate,
    });
  };
  const onRefresh = async () => {
    await refreshProjectApi();
    reload();
  };
  // 枚举转换
  const projectProgress = (record) => {
    return projectProgressOptions[record.projectProgress ?? 0];
  };

  // 跳转详情
  const handleDetail = (record: Recordable) => {
    projectStore.setProjectRow(record);
    router.push({
      path: '/projectDetail',
      query: {
        id: record.id,
        warningStatus: record.warningStatus,
        projectProgress: record.projectProgress,
      },
    });
  };
  const handleMilestoneConfig = (record: Recordable) => {
    if (!record.generalBudget) {
      return message.error('请先完善项目信息');
    }
    router.push({
      path: '/projectMilestoneConfig',
      query: {
        id: record.id,
        isDefer: 0,
      },
    });
  };
  const store = useUserStore();

  onMounted(async () => {
    await projectStore.setUserHasRoleKey();
    await projectStore.setUserCode().finally(reload);
  });
  // 管控项目确认
  const handleControl = async (record: Recordable, isControl: Boolean) => {
    const { id } = record;
    await controlDetermineApi({ id, determineStatus: isControl ? 1 : 0 });

    // 填写管控意见
    if (!isControl) {
      await editApi({
        id: record.id,
        remark: `${store.getUserInfo.nickName} : 无需管控`,
      });
    }
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
      await controlEndApplyApi(id, { controlOpinion: store.userInfo?.nickName });
    } else {
      await controlExtensionApplyApi(id, { controlOpinion: store.userInfo?.nickName });
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
      let params = unref(selectId);
      console.log(params);
      const res = await exportApi(params, searchParams.value);
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
