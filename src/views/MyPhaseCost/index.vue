<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
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
  import ProjectPhaseCostModal from './MyPhaseCostModal.vue';
  import { columns, searchFormSchema } from './MyPhaseCost.data';
  import { Ref, onMounted, reactive, ref } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useModal } from '/@/components/Modal';
  import { useECharts } from '/@/hooks/web/useECharts';
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [
        ['date', ['startDate', 'endDate'], 'YYYY-MM-DD'],
        ['costSubmitTime', ['submitStartDate', 'submitEndDate'], 'YYYY-MM-DD'],
      ],
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
