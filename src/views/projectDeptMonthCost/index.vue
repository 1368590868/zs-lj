<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="debounceExportExcel"> 下载 </a-button>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns, searchFormSchema } from './projectDeptMonthCost.data';
  import { exportDeptMonthCostApi, getDeptMonthCostApi } from '/@/api/project/project';
  import { debounce } from 'lodash-es';
  import { ref } from 'vue';
  import { message } from 'ant-design-vue';

  const [registerTable] = useTable({
    api: getDeptMonthCostApi,
    columns,
    formConfig: {
      labelWidth: 120,
      colon: true,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [['submitDate', ['submitStartDate', 'submitEndDate'], 'YYYY-MM-DD']],
    },
    beforeFetch: (info) => {
      searchParams.value = info;
      return info;
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    clickToRowSelect: false,
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const searchParams = ref({});

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
      const res = await exportDeptMonthCostApi(searchParams.value);
      const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
      const blobURL = window.URL.createObjectURL(blob);

      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', '部门月度成本统计.xlsx');
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
