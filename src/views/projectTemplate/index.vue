<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleEditModal({})"> + 管控模板 </a-button>
      </template>
      <template #action="{ record, index }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: handleEditModal.bind(null, record, true),
              ifShow: record.professionType !== '通用',
            },
            {
              label: '删除',
              popConfirm: {
                title: '是否确认操作',
                confirm: handleDelete.bind(null, record),
              },
              ifShow: record.professionType !== '通用',
            },
          ]"
        />
      </template>
    </BasicTable>
    <ProjectTemplateModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { pageApi, removeApi } from '/@/api/projectTemplate/projectTemplate';
  import ProjectTemplateModal from './ProjectTemplateModal.vue';
  import { columns, searchFormSchema } from './projectTemplate.data';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useModal } from '/@/components/Modal';
  import { message } from 'ant-design-vue';
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '项目模板列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 120,
      colon: true,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    beforeFetch: (info) => {
      if (info?.professionTypes) {
        const professionTypes = info.professionTypes.split('-');
        if (professionTypes.length === 2) {
          info.professionType = professionTypes[1];
          info.businessType = professionTypes[0];
        } else {
          info.businessType = professionTypes[0];
        }
        Reflect.deleteProperty(info, 'professionTypes');
      }
      return info;
    },
    clickToRowSelect: false,
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
  const { hasPermission } = usePermission();

  // 编辑项目模板 Modal
  const handleEditModal = (record: Recordable, isUpdate = false) => {
    openModal(true, {
      record,
      isUpdate,
    });
  };

  // 删除项目模板
  const handleDelete = async (record: Recordable) => {
    // 删除操作
    await removeApi(record.id);
    reload();
    message.success('删除成功');
  };

  // 成功
  function handleSuccess() {
    reload();
  }
</script>
