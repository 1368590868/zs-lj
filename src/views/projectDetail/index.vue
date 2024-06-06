<template>
  <PageWrapper>
    <Description @register="register" />
    <div class="mt-6"></div>
    <BasicTable @register="registerTable">
      <!-- 顶部echarts -->
      <template #headerTop>
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
              <!-- <a-button type="primary" @click="onDetail">项目成本明细</a-button> -->
              <a-button type="primary" @click="onLogs">项目管控日志</a-button>
              <a-button type="primary" @click="onRemark">管控意见</a-button>
            </Space>
          </div>
        </div>
        <div ref="chartRef" class="w-full min-h-200px"></div>
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
  import { Card, Space } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { detail } from '/@/api/project/project';
  import { Ref, computed, h, nextTick, onMounted, reactive, ref, watch, watchEffect } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { DescItem, useDescription, Description } from '/@/components/Description';
  import { useRouter } from 'vue-router';
  import { columns, searchFormSchema } from './projectDetail.data';
  import ProjectDetailModal from './ProjectDetailModal.vue';
  import { useModal } from '/@/components/Modal';
  import { WarningStatusEnum, projectProgressOptions } from '/@/enums/projectControl';
  import { pageApi } from '/@/api/projectPhaseCost/projectPhaseCost';
  import { pageApi as projectPhase } from '/@/api/projectPhase/projectPhase';
  import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';
  import { EllipsisText } from '/@/components/EllipsisText';
  // 图表
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, resize } = useECharts(chartRef as Ref<HTMLDivElement>);
  const router = useRouter();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: pageApi,
    columns,
    searchInfo: {
      projectId: router.currentRoute.value.query?.id,
    },
    formConfig: {
      labelWidth: 100,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [['date', ['submitStartDate', 'submitEndDate'], 'YYYY-MM-DD']],
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
        return `${data.planStartDate} - ${data.planEndDate}`;
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
    return useCurrencyFormatter(dataSource['totalCost']) + ' 元';
  });

  const badgeClass = () =>
    `w-6 h-6 rounded-[1.5rem] text-[12px] leading-[24px] text-center text-white`;

  onMounted(() => {
    getDetail();
  });

  const echartsData = reactive({
    yAxis: ['第一阶段'],
    actualCost: [0],
    estimatedCost: [0],
  });

  (async () => {
    const res = await projectPhase({ projectId: router.currentRoute.value.query.id });
    const { records = [] } = res;
    echartsData.yAxis = records.map((item) => item.phaseTitle);
    echartsData.actualCost = records.map((item) => item.phaseOutlayCost ?? 0);
    echartsData.estimatedCost = records.map((item) => item.phaseBudgetCost);
    console.log(echartsData, '************');
  })();

  watchEffect(async () => {
    const barWidth = 30; // 柱状图的宽度
    const chartHeight = 2 * (echartsData.yAxis.length * barWidth + 50); // 计算图表的宽度，+100 是为了留出左右的边距
    setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {},
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
      },
      yAxis: {
        type: 'category',
        boundaryGap: false,
        data: echartsData.yAxis,
      },
      series: [
        {
          name: '实际成本',
          type: 'bar',
          data: echartsData.actualCost,
          label: {
            show: true,
          },
          itemStyle: {
            color: '#DBD8FF',
          },
        },
        {
          name: '预估成本',
          type: 'bar',
          data: echartsData.estimatedCost,
          label: {
            show: true,
          },
          itemStyle: {
            color: '#8DD0FF',
          },
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
      path: '/projectLogs',
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
