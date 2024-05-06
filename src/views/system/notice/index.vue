<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" v-if="hasPermission(['sys_notice_add'])"
          >新增</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '查看',
              tooltip: '查看详情',
              onClick: handleDetail.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              ifShow: hasPermission(['sys_notice_edit']),
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'wpf:delete',
              color: 'error',
              tooltip: '撤销公告',
              ifShow: hasPermission(['sys_notice_remove']),
              popConfirm: {
                title: '是否确认撤销',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <NoticeModal @register="registerNotice" @success="handleSuccess" />
    <NoticeDetail @register="registerDetail" />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getNoticeListApi, delNoticeApi } from '/@/api/sys/notice';
  import { columns, searchFormSchema } from './notice.data';
  import NoticeModal from './NoticeModal.vue';
  import NoticeDetail from './NoticeDetailModal.vue';
  import { useModal } from '/@/components/Modal';
  import { message } from 'ant-design-vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  const [registerTable, { reload }] = useTable({
    title: '公告列表',
    api: getNoticeListApi,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  const [registerNotice, { openModal }] = useModal();
  const [registerDetail, { openModal: openModal1 }] = useModal();
  const { hasPermission } = usePermission();
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }
  function handleDetail(record: Recordable) {
    openModal1(true, {
      record,
    });
  }
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  const handleDelete = async (record: Recordable) => {
    const { id } = record;
    await delNoticeApi(id);
    message.success('删除成功');
    reload();
  };
  const handleSuccess = () => {
    reload();
  };
</script>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '/notice',
  });
</script>
