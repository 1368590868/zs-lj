<template>
  <PageWrapper>
    <Description @register="register" />
    <div class="mt-6"></div>
    <Card>
      <div class="flex justify-between">
        <div>工程阶段：{{ getProgress }}</div>
        <div>实际成本：{{ getTotleCost }}</div>
        <div class="flex"
          >项目预警状态：
          <div
            v-if="showStatus === WarningStatusEnum.YELLOW"
            :class="badgeClass()"
            style="background: #efad03"
            >黄</div
          >
          <div
            v-if="showStatus === WarningStatusEnum.RED"
            :class="badgeClass()"
            style="background: #ff7455"
            >红</div
          >
          <div
            v-if="showStatus === WarningStatusEnum.GREEN"
            :class="badgeClass()"
            style="background: #27cb0d"
            >绿</div
          >
        </div>
        <div>
          <Space>
            <a-button type="primary" @click="onLogs">项目管控日志</a-button>
            <a-button
              type="primary"
              @click="onRemark"
              v-if="projectStore.hasRoles(ProjectRoleEnum.LEADER)"
              >管控意见</a-button
            >
          </Space>
        </div>
      </div>
      <div ref="chartRef" class="w-full min-h-200px"></div>
    </Card>
    <div class="mt-6"></div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="debounceExportExcel"> 下载 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '详情',
              onClick: onRemarkDetail.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>

    <ProjectDetailModal @register="registerModal" @success="reload" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { Card, Space, message } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { detail } from '/@/api/project/project';
  import { Ref, computed, h, nextTick, onMounted, reactive, ref, watch, watchEffect } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { DescItem, useDescription, Description } from '/@/components/Description';
  import { useRouter } from 'vue-router';
  import { columns, searchFormSchema } from './projectDetail.data';
  import ProjectDetailModal from './ProjectDetailModal.vue';
  import { useModal } from '/@/components/Modal';
  import {
    ProjectRoleEnum,
    WarningStatusEnum,
    projectProgressOptions,
  } from '/@/enums/projectControl';
  import { pageApi, exportApi } from '/@/api/projectPhaseCost/projectPhaseCost';
  import { pageApi as projectPhase } from '/@/api/projectPhase/projectPhase';
  import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';
  import { EllipsisText } from '/@/components/EllipsisText';
  import { useProjectControl } from '/@/store/modules/projectControl';
  import { debounce } from 'lodash-es';
  // 图表
  const chartRef = ref<HTMLDivElement | null>(null);
  const searchParams = ref({});
  const { setOptions, resize, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
  const router = useRouter();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: pageApi,
    columns,
    canResize: false,
    searchInfo: {
      projectId: router.currentRoute.value.query?.id,
    },
    formConfig: {
      labelWidth: 100,
      colon: true,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [['date', ['submitStartDate', 'submitEndDate'], 'YYYY-MM-DD']],
    },
    beforeFetch: (info) => {
      if (info?.allStatus) {
        info[info.allStatus === '2' ? 'projectLeaderStatus' : 'costLeaderStatus'] = info.allStatus;
        Reflect.deleteProperty(info, 'allStatus');
      }
      searchParams.value = info;
      getEchartsData();
      return {
        ...info,
      };
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
      title: '审批意见',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  const schema: DescItem[] = [
    {
      field: 'projectName',
      label: '项目名称',
      render: (value) => {
        return h(EllipsisText, { tooltip: value }, () => value);
      },
    },
    {
      field: 'generalBudget',
      label: '项目预算',
      render: (value) => {
        return `${useCurrencyFormatter(value)} 元`;
      },
    },
    {
      field: 'date',
      label: '工程计划时间',
      render: (_, data) => {
        return `${data.planStartDate} 至 ${data.planEndDate}`;
      },
    },
    {
      field: 'deptName',
      label: '归属部门',
    },
    {
      field: 'projectOwnerName',
      label: '项目负责人',
    },
    {
      field: 'costOwnerName',
      label: '成本负责人',
    },
  ];
  const dataSource = reactive({});
  const [register] = useDescription({
    title: '项目基础信息',
    bordered: false,
    data: dataSource,
    schema,
  });
  const showStatus = computed(() => {
    return router.currentRoute.value.query?.warningStatus;
  });
  const getProgress = computed<string>(() => {
    return projectProgressOptions[Number(router.currentRoute.value.query?.projectProgress)];
  });
  const getTotleCost = computed(() => {
    return useCurrencyFormatter(dataSource['totalCost'] ?? 0) + ' 元';
  });

  const badgeClass = () =>
    `w-6 h-6 rounded-[1.5rem] text-[12px] leading-[24px] text-center text-white`;

  const echartsData = reactive({
    yAxis: ['第一阶段'],
    actualCost: [0],
    estimatedCost: [0],
    datasource: [{ phaseTitle: '', id: '' }],
  });

  const projectStore = useProjectControl();
  const getRoles = async () => {
    await projectStore.setUserHasRoleKey();
  };

  onMounted(() => {
    getDetail();
    getRoles();
    getInstance()?.on('click', function (params) {
      try {
        router.push({
          name: 'ProjectPhaseCost',
          query: {
            id: echartsData.datasource.find((x: any) => x.phaseTitle === params.name)?.id,
            projectId: router.currentRoute.value.query.id,
          },
        });
      } catch (error) {
        message.error('暂无数据');
      }
    });
  });

  const getEchartsData = async () => {
    const res = await projectPhase({ projectId: router.currentRoute.value.query.id, size: 100 });
    const { records = [] } = res;
    echartsData.yAxis = records.map((item) => item.phaseTitle);
    echartsData.actualCost = records.map((item) => item.phaseOutlayCost ?? 0);
    echartsData.estimatedCost = records.map((item) => item.phaseBudgetCost);
    echartsData.datasource = records;
  };

  watchEffect(async () => {
    const barWidth = 30; // 柱状图的宽度
    const chartHeight = 2 * (echartsData.yAxis.length * barWidth + 50);
    setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
        axisLabel: {
          formatter: '{value} 元',
        },
        zlevel: 1, // 提高x轴标签的层级
      },
      yAxis: {
        type: 'category',
        boundaryGap: true,
        data: echartsData.yAxis,
      },
      series: [
        {
          name: '实际成本',
          type: 'bar',
          data: echartsData.actualCost,
          label: {
            show: true,
            position: 'right',
          },
          itemStyle: {
            color: '#DBD8FF',
          },
          barWidth: barWidth, // 设置柱子的宽度
          barGap: '0%', // 不同系列的柱子之间不留空隙
        },
        {
          name: '预估成本',
          type: 'bar',
          data: echartsData.estimatedCost,
          label: {
            show: true,
            position: 'right',
          },
          itemStyle: {
            color: '#8DD0FF',
          },
          barWidth: barWidth, // 设置柱子的宽度
          barGap: '0%', // 不同系列的柱子之间不留空隙
        },
      ],
    });
    nextTick(() => {
      if (chartRef.value) {
        chartRef.value.setAttribute('style', `height: ${chartHeight}px`);
        resize();
      }
    });
  });

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

  const getDetail = async () => {
    const params = router.currentRoute.value.query;
    const data = await detail(params.id);
    Object.assign(dataSource, data);
  };

  const onRemark = () => {
    openModal(true, {
      isUpdate: true,
      dataSource,
    });
  };
  const onLogs = () => {
    router.push({
      name: 'ProjectLogs',
      query: {
        id: router.currentRoute.value.query.id,
      },
    });
  };
  const onRemarkDetail = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: false,
    });
  };
</script>
<style lang="less" scoped>
  .vben-basic-table-form-container {
    padding: initial;
  }
</style>
