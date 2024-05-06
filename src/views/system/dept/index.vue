<template>
  <div>
    <BasicTable
      @register="registerTable"
      @fetch-success="onFetchSuccess"
      rowKey="id"
      @selection-change="onSelectionChange"
    >
      <template #toolbar>
        <Button type="primary" v-if="hasPermission(['sys_dept_add'])" @click="handleCreate">
          新增
        </Button>
        <importFile @success="importExcel" v-if="hasPermission(['sys_dept_import'])" title="导入" />
        <Button type="primary" @click="exportExcel" v-if="hasPermission(['sys_dept_export'])">
          导出
        </Button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑组织',
              ifShow: hasPermission(['sys_dept_edit']),
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'wpf:delete',
              color: 'error',
              tooltip: '删除组织',
              ifShow: hasPermission(['sys_dept_remove']),
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <DeptDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script setup lang="ts">
  import { Button, message } from 'ant-design-vue';
  import { importFile } from '/@/components/System';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { deptListApi, delDeptApi, exportDeptApi, importDeptApi } from '/@/api/sys/dept';
  import DeptDrawer from './DeptDrawer.vue';
  import { columns, searchFormSchema } from './dept.data';
  // import { ref } from 'vue';
  import { useDrawer } from '/@/components/Drawer';
  import { reactive } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  let selectId = reactive<any[]>([]);
  const [registerTable, { reload }] = useTable({
    title: '组织列表',
    api: deptListApi,
    beforeFetch: (params) => {
      return params;
    },
    columns,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
    },
    clickToRowSelect: false,
    rowSelection: {
      type: 'checkbox',
    },
    isTreeTable: false,
    // pagination: false,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });
  const { hasPermission } = usePermission();
  const [registerDrawer, { openDrawer }] = useDrawer();
  function onFetchSuccess() {
    // 演示默认展开所有表项
    // nextTick(expandAll);
  }
  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }
  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }
  const handleDelete = async (record: Recordable) => {
    const { id } = record;
    await delDeptApi(id);
    message.success('删除成功');
    reload();
  };
  function handleSuccess() {
    reload();
  }
  // 导出
  const exportExcel = async () => {
    try {
      let params = selectId.toString();
      if (!params) {
        message.error('至少选中一个');
        return;
      }
      const res = await exportDeptApi(params);
      const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      message.success('导出成功');
    } catch (error) {
      console.log(error);
    }
  };
  // excel导入
  const importExcel = async (e) => {
    try {
      let params = {
        file: e,
      };
      const res = await importDeptApi(params);
      let data = JSON.parse(JSON.stringify(res));
      if (data.data.code == 1) {
        message.success(data.data.msg);
        return;
      }
      message.success('导入成功');
      reload();
    } catch (error) {
      console.log(error);
    }
  };
  // 勾选事件触发
  const onSelectionChange = async (e) => {
    selectId = reactive<any[]>([]);
    e.rows.forEach((it) => {
      selectId.push(it.id);
    });
  };
</script>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '/dept',
  });
</script>
