<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <!-- 顶部echarts -->
      <template #headerTop>
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
    <ProjectPhaseCostModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { pageApi, exportApi } from '/@/api/projectPhaseCost/projectPhaseCost';
  import ProjectPhaseCostModal from './projectCostDetailModal.vue';
  import { columns, searchFormSchema } from './projectCostDetail.data';
  import { Ref, onMounted, reactive, ref } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useModal } from '/@/components/Modal';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: pageApi,
    columns,
    searchInfo: {
      projectId: router.currentRoute.value.query?.id,
    },
    formConfig: {
      labelWidth: 120,
      colon: true,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
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
  const { hasPermission } = usePermission();
  // 图表
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  onMounted(() => {
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
        data: ['项目管控'],
      },
      series: [
        {
          name: '实际成本',
          type: 'bar',
          data: [router.currentRoute.value.query?.totalCost ?? 0],
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
          data: [router.currentRoute.value.query?.generalBudget ?? 0],
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
  let selectId = reactive<any[]>([]);

  const onRemarkDetail = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: true,
    });
  };

  // 成功
  function handleSuccess() {
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
  const onSelectionChange = async (e) => {
    selectId = reactive<any[]>([]);
    e.rows.forEach((it) => {
      selectId.push(it.id);
    });
  };
</script>
