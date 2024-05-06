<template>
  <BasicModal width="1000px" title="按钮分配" v-bind="$attrs" @register="registerModal">
    <BasicTable @register="registerTable" :max-height="300">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑按钮',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'wpf:delete',
              color: 'error',
              tooltip: '删除按钮',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <AddBtnModal @register="registerAddModal" @success="handleSuccess" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { btnColumns, searchBtnFormSchema } from './menu.data';
  import { getMenuList } from '/@/api/sys/menu';
  import AddBtnModal from './AddBtnModal.vue';
  const [registerAddModal, { openModal }] = useModal();
  const [registerTable, {}] = useTable({
    api: getMenuList,
    columns: btnColumns,
    useSearchForm: true,
    formConfig: {
      labelWidth: 65,
      schemas: searchBtnFormSchema,
    },
    clickToRowSelect: false,

    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn(info) {
      return info;
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  const [registerModal, { setModalProps }] = useModalInner(async () => {
    setModalProps({ confirmLoading: false });
  });
  const handleEdit = () => {};
  const handleDelete = () => {};
  const handleCreate = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: true,
    });
  };
  const handleSuccess = () => {};
</script>
