<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Button type="primary" @click="handleAdd">添加</Button>
        <!-- <Button type="primary"> 回收站 </Button> -->
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'basil:copy-solid',
              tooltip: '复制',
              onClick: handleCopy.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
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
    <PreviewModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script setup lang="ts">
  import { Button } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { dataSourceListApi, dataSourceRemoveApi } from '/@/api/codegen/dataSource';
  import PreviewModal from './addDataSourceModal.vue';
  import { columns, searchFormSchema } from './dataSource';
  import { useModal } from '/@/components/Modal';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '数据源列表',
    api: dataSourceListApi,
    columns,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [['fieldTime', ['stime', 'etime']]],
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    clickToRowSelect: false,
    showIndexColumn: true,
    pagination: {
      current: 1,
      pageSize: 10,
    },
    actionColumn: {
      width: 240,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  const handleEdit = (record: Recordable) => {
    openModal(true, {
      isUpdate: 2,
      record,
    });
  };
  const handleCopy = (record: Recordable) => {
    openModal(true, {
      isUpdate: 3,
      record,
    });
  };
  const handleDelete = async (record: Recordable) => {
    try {
      await dataSourceRemoveApi(record.id);
      reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdd = () => {
    openModal(true, {
      isUpdate: 1,
    });
  };
  const handleSuccess = () => {
    reload();
  };
</script>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '/dataSource',
  });
</script>

<style scoped></style>
