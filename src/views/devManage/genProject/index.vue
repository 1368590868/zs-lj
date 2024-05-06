<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 创建工程 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'material-symbols:download',
              tooltip: '下载工程',
              onClick: handleDownload.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑工程',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'wpf:delete',
              color: 'error',
              tooltip: '删除工程',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <GenProjectModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { pageApi, removeApi, addApi } from '/@/api/codegen/genProject';
  import GenProjectModal from './GenProjectModal.vue';
  import { columns, searchFormSchema } from './genProject.data';
  import { reactive } from 'vue';
  import { useModal } from '/@/components/Modal';
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '生成工程列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 60,
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
  // 创建生成工程
  const handleCreate = () => {
    openModal(true, {
      isUpdate: false,
    });
  };
  // 编辑工程
  const handleEdit = (record: Recordable) => {
    openModal(true, {
      isUpdate: true,
      record,
    });
  };
  // 删除生成工程
  const handleDelete = async (record: Recordable) => {
    await removeApi(record.id);
    message.success('删除工程成功');
    reload();
  };
  // 下载工程
  const handleDownload = async (record: Recordable) => {
    // let params = {};
    const res = await addApi(record);
    const blob = new Blob([res.data], { type: 'application/zip' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
    message.success('导出成功');
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
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '/genProject',
  });
</script>
