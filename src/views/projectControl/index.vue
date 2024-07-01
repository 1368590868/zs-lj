<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #toolbar>
        <a-button type="primary" @click="exportExcel"> 下载 </a-button>
      </template>
      <!-- bodycell slot-->
      <template #controlStatus="{ record }">
        <TypographyText
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
              label: '详情',
              onClick: handleDetail.bind(null, record),
              ifShow: record.controlStatus === +ControlStatusEnum.CONTROL,
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { message, TypographyText } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { pageApi, projectStatisticsExportApi } from '/@/api/project/project';
  import { columns, searchFormSchema } from './projectControl.data';
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    controlStatusOptions,
    projectProgressOptions,
    ControlStatusEnum,
  } from '/@/enums/projectControl';

  const router = useRouter();
  const searchParams = ref({});
  const [registerTable, { reload, clearSelectedRowKeys, getForm }] = useTable({
    title: '项目管控统计列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 120,
      colon: true,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [['date', ['startDate', 'endDate'], 'YYYY-MM-DD']],
    },
    searchInfo: {
      deptCode: router.currentRoute.value.query?.deptCode,
    },
    beforeFetch: (params) => {
      searchParams.value = params;
      return params;
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
      width: 120,
      title: '详情',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  onMounted(() => {
    getForm().setFieldsValue({
      controlStatus: ControlStatusEnum.CONTROL,
      warningStatus: router.currentRoute.value.query?.warningStatus,
    });
  });

  // 枚举转换
  const projectProgress = (record) => {
    return projectProgressOptions[record.projectProgress ?? 0];
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
        projectProgress: record.projectProgress,
      },
    });
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
      const res = await projectStatisticsExportApi(searchParams.value);
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
