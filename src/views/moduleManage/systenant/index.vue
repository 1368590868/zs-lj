<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
        <importFile @success="importExcel" title="导入" />
        <a-button type="primary" @click="exportExcel"> 导出 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ic:baseline-edit-note',
              tooltip: '编辑租户表Modal',
              onClick: handleEditModal.bind(null, record),
            },
            {
              icon: 'wpf:delete',
              color: 'error',
              tooltip: '删除租户表',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <SysTenantModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { importFile } from '/@/components/System';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { pageApi, removeApi, exportApi, importApi } from '/@/api/tenant/systenant';
  import SysTenantModal from './SysTenantModal.vue';
  import { columns, searchFormSchema } from './sysTenant.data';
  import { reactive } from 'vue';
  import { useModal } from '/@/components/Modal';
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '租户表列表',
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
  let selectId = reactive<any[]>([]);
  // 创建租户表
  const handleCreate = () => {
    openModal(true, {
      isUpdate: false,
    });
  };
  // 编辑租户表 Modal
  const handleEditModal = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: true,
    });
  };
  // 删除租户表
  const handleDelete = async (record: Recordable) => {
    await removeApi(record.id);
    message.success('删除租户表成功');
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
    } catch (error) {
      console.log(error);
    }
  };

  // 导出
  const exportExcel = async () => {
    try {
      let params = selectId.toString();
      if (!params) {
        message.error('导出至少选中一个');
        return;
      }
      const res = await exportApi(params);
      const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      message.success('导出成功');
    } catch (error) {
      console.log(error);
    }
  };
  const onSelectionChange = async (e) => {
    selectId = reactive<any[]>([]);
    e.rows.forEach((it) => {
      selectId.push(it.id);
    });
  };
</script>
