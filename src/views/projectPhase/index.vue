<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #toolbar>
        <a-button type="primary" @click="exportExcel"> 下载 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '查看',
              onClick: handleDetail.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { pageApi, exportApi } from '/@/api/projectPhase/projectPhase';
  import { columns, searchFormSchema } from './projectPhase.data';
  import { onMounted, reactive, ref } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useRouter } from 'vue-router';
  import { useProjectControl } from '/@/store/modules/projectControl';
  import { ProjectRoleEnum } from '/@/enums/projectControl';

  const router = useRouter();
  const projectStore = useProjectControl();
  const searchParams = ref({});
  const [registerTable, { reload }] = useTable({
    title: '项目阶段列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 120,
      colon: true,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [['date', ['startDate', 'endDate'], 'YYYY-MM-DD']],
    },
    beforeFetch: (info) => {
      const searchs = {
        ...info,
        projectOwnerNumber:
          projectStore.hasRoles(ProjectRoleEnum.LEADER) ||
          projectStore.hasRoles(ProjectRoleEnum.YYB)
            ? null
            : projectStore.userCode,
        costOwnerNumber:
          projectStore.hasRoles(ProjectRoleEnum.LEADER) ||
          projectStore.hasRoles(ProjectRoleEnum.YYB)
            ? null
            : projectStore.userCode,
      };
      searchParams.value = searchs;
      return searchs;
    },
    immediate: false,
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
      title: '成本明细',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  const { hasPermission } = usePermission();
  let selectId = reactive<any[]>([]);

  onMounted(async () => {
    await projectStore.setUserHasRoleKey();
    if (
      projectStore.hasRoles(ProjectRoleEnum.XMFZR) ||
      projectStore.hasRoles(ProjectRoleEnum.CBFZR)
    ) {
      await projectStore.setUserCode().finally(reload);
    } else {
      reload();
    }
  });
  // 跳转里程碑详情
  const handleDetail = (record: Recordable) => {
    router.push({
      name: 'ProjectPhaseCost',
      query: {
        id: record.id,
        projectId: record.projectId,
      },
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
      const res = await exportApi(params, searchParams.value);
      const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      console.log(url);
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
