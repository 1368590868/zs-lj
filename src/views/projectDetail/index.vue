<template>
  <PageWrapper>
    <Description @register="register" />
    <div class="mt-6"></div>
    <Card>
      <template #title>
        <div class="flex justify-between">
          <div>工程阶段：进行中</div>
          <div class="flex"
            >项目预警状态：
            <div :class="badgeClass('#EFAD03')">黄</div>
            <div :class="badgeClass('#FF7455')">红</div>
            <div :class="badgeClass('#27CB0D')">绿</div>
          </div>
          <div>
            <Space>
              <a-button type="primary" @click="onDetail">项目成本明细</a-button>
              <a-button type="primary" @click="onRemark">管控意见</a-button>
            </Space>
          </div>
        </div>
      </template>
      <div ref="chartRef" class="w-full min-h-600px"></div>
    </Card>
    <div class="mt-6"></div>
    <Card title="项目日志">
      <BasicTable @register="registerTable" />
    </Card>
    <ProjectDetailModal @register="registerModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { Card, Space } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { detail, getLogsApi } from '/@/api/project/project';
  import { Ref, onMounted, reactive, ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { DescItem, useDescription, Description } from '/@/components/Description';
  import { RouteParamValueRaw, useRouter } from 'vue-router';
  import { basicColumns } from './projectDetail.data';
  import ProjectDetailModal from './ProjectDetailModal.vue';
  import { useModal } from '/@/components/Modal';

  // 图表
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  const router = useRouter();
  const [registerModal, { openModal }] = useModal();

  const schema: DescItem[] = [
    {
      field: 'projectName',
      label: '项目名称',
    },
    {
      field: 'generalBudget',
      label: '项目预算',
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
      field: 'costLeader',
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

  // 项目操作日志
  const [registerTable] = useTable({
    api: getLogsApi,
    columns: basicColumns,
    pagination: { pageSize: 10 },
  });

  const badgeClass = (color: string) =>
    `bg-color-[${color}] w-6 h-6 rounded-[1.5rem] text-[12px] leading-[24px] text-center text-white`;
  onMounted(() => {
    getDetail();
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
        data: ['第一阶段'],
      },
      series: [
        {
          name: '实际成本',
          type: 'bar',
          data: [18203],
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
          data: [19325],
          label: {
            show: true,
          },
          itemStyle: {
            color: '#8DD0FF',
          },
        },
      ],
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
  const onDetail = () => {
    router.push({
      path: '/projectCostDetail',
      query: {
        id: router.currentRoute.value.query.id,
        generalBudget: dataSource['generalBudget'],
        totalCost: dataSource['totalCost'],
      },
    });
  };
</script>