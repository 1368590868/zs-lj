<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #toolbar>
        <a-button type="primary" @click="onRefresh"> 刷新项目数据 </a-button>
        <a-button type="primary" @click="debounceExportExcel"> 下载 </a-button>
      </template>
      <!-- bodycell slot-->
      <template #controlStatus="{ record }">
        <TypographyText
          :type="
            [+ControlStatusEnum.NONE, +ControlStatusEnum.END].includes(record.controlStatus)
              ? 'secondary'
              : [+ControlStatusEnum.END_AUDIT].includes(record.controlStatus)
              ? 'danger'
              : undefined
          "
          >{{ controlStatusOptions[record.controlStatus ?? 0] }}</TypographyText
        >
      </template>

      <template #projectProgress="{ record }"> {{ projectProgress(record) }} </template>
      <!-- action slot -->
      <template #action="{ record }">
        <TableAction
          :actions="[
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
                confirm: handleControl.bind(null, record, true, 1),
              },
              ifShow:
                record.controlStatus === +ControlStatusEnum.TO_BE_JUDGED &&
                projectStore.hasRoles(ProjectRoleEnum.CBFZR),
            },
            // {
            //   label: '延期配置',
            //   onClick: handleDeferConfig.bind(null, record),
            //   ifShow:
            //     record.controlStatus === +ControlStatusEnum.DELAY_CONFIGURATION &&
            //     projectStore.hasRoles(ProjectRoleEnum.XMFZR),
            // },
            {
              label: '恢复管控',
              popConfirm: {
                // @ts-ignore
                title: h('div', { class: 'flex flex-col  justify-center items-center' }, [
                  h('div', { class: 'mb-3 self-start' }, '提示'),
                  h('div', { class: 'flex-1 ' }, '恢复管控后请重新判定是否需要管控！'),
                ]),
                confirm: handleControl.bind(null, record, true, 6),
              },
              ifShow:
                record.controlStatus === +ControlStatusEnum.NONE &&
                projectStore.hasRoles(ProjectRoleEnum.XMFZR),
            },
            {
              label: '结束管控',
              popConfirm: {
                // @ts-ignore
                title: h('div', { class: 'flex flex-col  justify-center items-center' }, [
                  h('div', { class: 'mb-3 self-start' }, '提示'),
                  h('div', { class: 'flex-1 ' }, '结束管控后不可恢复再次管控!'),
                  h('div', { class: 'flex-1 ' }, '结束管控的项目不再进行产值统计!'),
                ]),
                confirm: handleControlBtn.bind(null, record, true),
              },
              ifShow:
                [+ControlStatusEnum.CONTROL, +ControlStatusEnum.UNCONFIGURED].includes(
                  record.controlStatus,
                ) && projectStore.hasRoles(ProjectRoleEnum.XMFZR),
            },
            // {
            //   label: '延期管控',
            //   popConfirm: {
            //     title: '是否确认操作',
            //     confirm: handleControlBtn.bind(null, record, false),
            //   },
            //   ifShow:
            //     record.controlStatus === +ControlStatusEnum.TO_BE_COMPLETED &&
            //     projectStore.hasRoles(ProjectRoleEnum.XMFZR),
            // },
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
  import { computed, onMounted, ref, unref, h } from 'vue';
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
  const projectId = ref<string>('');

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getSelectRows, clearSelectedRowKeys }] = useTable({
    title: '项目管理列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 140,
      colon: true,
      autoAdvancedLine: 4,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [
        ['date', ['startDate', 'endDate'], 'YYYY-MM-DD'],
        ['gcplanStartDate', ['planStartDateStart', 'planStartDateEnd'], 'YYYY-MM-DD'],
        ['gcplanEndDate', ['planEndDateStart', 'planEndDateEnd'], 'YYYY-MM-DD'],
      ],
    },
    beforeFetch: (info) => {
      if (info?.professionTypes) {
        const professionTypes = info.professionTypes.split('-');
        if (professionTypes.length === 2) {
          info.professionType = professionTypes[1];
          info.businessType = professionTypes[0];
        } else {
          info.businessType = professionTypes[0];
        }
        Reflect.deleteProperty(info, 'professionTypes');
      }

      const searchs = {
        ...info,
        projectOwnerNumber:
          projectStore.hasRoles(ProjectRoleEnum.LEADER) ||
          projectStore.hasRoles(ProjectRoleEnum.YYB)
            ? null
            : projectStore.userCode || '没有查询到用户信息',
        costOwnerNumber:
          projectStore.hasRoles(ProjectRoleEnum.LEADER) ||
          projectStore.hasRoles(ProjectRoleEnum.YYB)
            ? null
            : projectStore.userCode || '没有查询到用户信息',
      };
      searchParams.value = searchs;
      return searchs;
    },
    indexColumnProps: {
      title: '序号',
      width: 100,
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
      width: 230,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  // 创建项目管理
  const handleCreate = (record) => {
    const { planStartDate, planEndDate } = record;
    const planDate = `${planStartDate ?? '-'} 至 ${planEndDate ?? '-'}`;

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
      name: 'ProjectDetail',
      query: {
        id: record.id,
        warningStatus: record.warningStatus,
        projectProgress: record.projectProgress,
      },
    });
  };
  const handleMilestoneConfig = (record: Recordable) => {
    projectId.value = record.id;
    handleCreate(record);
  };
  const store = useUserStore();

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
  // 管控项目确认
  const handleControl = async (record: Recordable, isControl: Boolean, controlStatus) => {
    const { id } = record;
    await controlDetermineApi({ id, determineStatus: isControl ? controlStatus : 0 });

    // 填写管控意见
    if (!isControl) {
      await editApi({
        id: record.id,
        remark: `${store.getUserInfo.nickName} : 无需管控`,
      });
    } else {
      if (controlStatus === 6) {
        await editApi({
          id: record.id,
          remark: '',
        });
      }
    }
    message.success('操作成功');
    reload();
  };
  // 延期配置
  const handleDeferConfig = (record: Recordable) => {
    router.push({
      name: 'ProjectMilestoneConfig',
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
    setTimeout(() => {
      router.push({
        name: 'ProjectMilestoneConfig',
        query: {
          id: projectId.value,
          isDefer: 0,
        },
      });
    }, 300);
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
      const blobURL = window.URL.createObjectURL(blob);

      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', '项目支出统计.xlsx');
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
      }
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);

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
