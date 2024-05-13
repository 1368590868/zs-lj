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
              onClick: handleEditModal.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <ProjectPhaseCostDrawer @register="registerDrawer" @success="handleSuccess" />
    <ProjectPhaseCostModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { importFile } from '/@/components/System';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    pageApi,
    removeApi,
    exportApi,
    importApi,
  } from '/@/api/projectPhaseCost/projectPhaseCost';
  import { useDrawer } from '/@/components/Drawer';
  import ProjectPhaseCostDrawer from './ProjectPhaseCostDrawer.vue';
  import ProjectPhaseCostModal from './ProjectPhaseCostModal.vue';
  import { columns, searchFormSchema } from './projectPhaseCost.data';
  import { Ref, onMounted, reactive, ref } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useModal } from '/@/components/Modal';
  import { useECharts } from '/@/hooks/web/useECharts';
  const [registerDrawer, { openDrawer }] = useDrawer();
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
  // 创建项目阶段成本明细
  const handleCreate = () => {
    openDrawer(true, {
      isUpdate: false,
    });
  };
  // 编辑项目阶段成本明细 Drawer
  const handleEdit = (record: Recordable) => {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  };
  // 编辑项目阶段成本明细 Modal
  const handleEditModal = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: true,
    });
  };
  // 删除项目阶段成本明细
  const handleDelete = async (record: Recordable) => {
    await removeApi(record.id);
    message.success('删除项目阶段成本明细成功');
    reload();
  };
  // 成功
  function handleSuccess() {
    reload();
  }

  // excel导入
  const importExcel = async (e) => {
    try {
      let params = {
        file: e,
      };
      const res = await importApi(params);
      let data = JSON.parse(JSON.stringify(res));
      if (data.data.code == 1) {
        message.success(data.data.msg);
        return;
      }
      message.success('导入成功');
      reload();
    } catch (error) {}
  };

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
  // 批量删除
  const HandleBatchDel = () => {
    let params = selectId.toString();
    message.success('批量删除' + params);
  };
</script>
