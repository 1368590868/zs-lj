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
              label: '编辑',
              onClick: onDetail.bind(null, record, ActionType.ADD),
              ifShow:
                record.updateBy === '1' &&
                (projectStore.hasRoles(ProjectRoleEnum.YYB) ||
                  projectStore.hasRoles(ProjectRoleEnum.XMFZR)),
            },
            {
              label: '填写',
              onClick: onDetail.bind(null, record, ActionType.EDIT),
              ifShow:
                record.updateBy === '2' &&
                (projectStore.hasRoles(ProjectRoleEnum.YYB) ||
                  projectStore.hasRoles(ProjectRoleEnum.XMFZR)),
            },
            {
              label: '查看',
              onClick: onDetail.bind(null, record, ActionType.VIEW),
              ifShow: record.updateBy === '0',
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
  import { columns, searchFormSchema, ActionType } from './projectOutputReport.data';
  import { onMounted, reactive, ref } from 'vue';
  import { ProjectRoleEnum } from '/@/enums/projectControl';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useRouter } from 'vue-router';
  import { exportApi, pageApi } from '/@/api/projectOutputValue/projectOutputValue';
  import { useProjectControl } from '/@/store/modules/projectControl';
  import moment from 'moment';

  const router = useRouter();
  const searchParams = ref({});
  const projectStore = useProjectControl();
  const [registerTable, { reload }] = useTable({
    api: pageApi,
    columns: columns,
    formConfig: {
      labelWidth: 120,
      colon: true,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    beforeFetch: (info) => {
      if (info.outputValueMonth) {
        info.outputValueMonth = `${moment(info.outputValueMonth).format('YYYY-MM')}-26`;
      }
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
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      title: '序号',
      width: 100,
    },
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const { hasPermission } = usePermission();
  let selectId = reactive<any[]>([]);

  // 成功
  function handleSuccess() {
    reload();
  }

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

  const store = useProjectControl();
  const onDetail = (record, type) => {
    store.setReportData(record);
    router.push({ name: 'ProjectReportDetail', query: { type } });
  };
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
  const onSelectionChange = async (e) => {
    selectId = reactive<any[]>([]);
    e.rows.forEach((it) => {
      selectId.push(it.id);
    });
  };
</script>
<style lang="less" scoped>
  :global(.ant-calendar-picker) {
    width: 100%;
  }
</style>
