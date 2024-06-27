<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange" :can-resize="true">
      <template #toolbar>
        <a-button type="primary" @click="debounceExportExcel"> 下载 </a-button>
      </template>
      <!-- 顶部echarts -->
      <template #headerTop>
        <div ref="chartRef" class="w-full min-h-200px"></div>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { pageApi, exportApi } from '/@/api/projectPhaseCost/projectPhaseCost';
  import { detailApi } from '/@/api/projectPhase/projectPhase';
  import { columns, searchFormSchema } from './projectPhaseCost.data';
  import { Ref, onMounted, reactive, ref, watchEffect } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { findNowPhasesByProjectIdApi } from '/@/api/projectPhase/projectPhase';
  import { useRouter } from 'vue-router';
  import { debounce } from 'lodash-es';
  import { message } from 'ant-design-vue';

  const router = useRouter();
  const searchParams = ref({});
  const [registerTable, { reload }] = useTable({
    title: '项目阶段成本明细列表',
    api: pageApi,
    // 额外参数
    searchInfo: {
      projectPhaseId: router.currentRoute.value.query.id,
    },
    beforeFetch: (info) => {
      if (info?.allStatus) {
        info[info.allStatus === '2' ? 'projectLeaderStatus' : 'costLeaderStatus'] = info.allStatus;
        Reflect.deleteProperty(info, 'allStatus');
      }
      searchParams.value = info;
      return {
        ...info,
      };
    },
    columns,
    formConfig: {
      labelWidth: 120,
      colon: true,
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
  });
  const { hasPermission } = usePermission();
  // 图表
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  const detail = ref({});
  const getFindCurrent = async () => {
    const res = await detailApi(router.currentRoute.value.query.id);
    detail.value = res;
  };
  watchEffect(() => {
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
        data: [detail.value['phaseTitle'] ?? ''],
      },
      series: [
        {
          name: '实际成本',
          type: 'bar',
          data: [detail.value['phaseOutlayCost'] ?? 0],
          label: {
            show: true,
            position: 'right',
          },
          itemStyle: {
            color: '#DBD8FF',
          },
        },
        {
          name: '预估成本',
          type: 'bar',
          data: [detail.value['phaseBudgetCost'] ?? 0],
          label: {
            show: true,
            position: 'right',
          },
          itemStyle: {
            color: '#8DD0FF',
          },
        },
      ],
    });
  });
  onMounted(() => {
    getFindCurrent();
  });
  let selectId = reactive<any[]>([]);
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
      window.open(url, '_blank');
      message.success('导出成功');
    } catch (error) {}
  };
  // 成功
  function handleSuccess() {
    reload();
  }
  const onSelectionChange = async (e) => {
    selectId = reactive<any[]>([]);
    e.rows.forEach((it) => {
      selectId.push(it.id);
    });
  };
</script>
