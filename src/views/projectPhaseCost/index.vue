<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange" :can-resize="true">
      <!-- 顶部echarts -->
      <template #headerTop>
        <div ref="chartRef" class="w-full min-h-200px"></div>
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '详情',
              onClick: handleEditModal.bind(null, record),
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
  import ProjectPhaseCostModal from './ProjectPhaseCostModal.vue';
  import { columns, searchFormSchema } from './projectPhaseCost.data';
  import { Ref, onMounted, reactive, ref, unref, watchEffect } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useModal } from '/@/components/Modal';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { findNowPhasesByProjectIdApi } from '/@/api/projectPhase/projectPhase';
  import { useRouter } from 'vue-router';
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '项目阶段成本明细列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 120,
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

  const router = useRouter();
  const detail = ref({});
  const getFindCurrent = async () => {
    const res = await findNowPhasesByProjectIdApi(router.currentRoute.value.query.projectId);
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

  // 编辑项目阶段成本明细 Modal
  const handleEditModal = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: true,
    });
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
