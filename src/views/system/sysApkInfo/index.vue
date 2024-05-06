<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑Drawer',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'wpf:delete',
              color: 'error',
              tooltip: '删除',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <SysApkInfoDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { pageApi, removeApi } from '/@/api/sys/sysApkInfo';
  import { useDrawer } from '/@/components/Drawer';
  import SysApkInfoDrawer from './SysApkInfoDrawer.vue';
  import { columns, searchFormSchema } from './sysApkInfo.data';

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    clickToRowSelect: false,
    rowSelection: {
      type: 'checkbox',
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
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  // 创建
  const handleCreate = () => {
    openDrawer(true, {
      isUpdate: false,
    });
  };
  // 编辑 Drawer
  const handleEdit = (record: Recordable) => {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  };
  // 删除
  const handleDelete = async (record: Recordable) => {
    await removeApi(record.id);
    message.success('删除成功');
    reload();
  };
  // 成功
  function handleSuccess() {
    reload();
  }
</script>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '/sysApkInfo',
  });
</script>
