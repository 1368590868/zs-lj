<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #auditOpinion="{ record }">
        <a-button type="link" @click="handleDetailModal(record)">详情</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '修改',
              onClick: handleEditModal.bind(null, record),
              ifShow: record.projectLeaderStatus !== ProjectOwnerStatusEnum.PASSED,
            },
            {
              label: '删除',
              popConfirm: {
                title: '确定删除这条记录吗？',
                confirm: handleDelete.bind(null, record),
              },
              ifShow: record.projectLeaderStatus !== ProjectOwnerStatusEnum.PASSED,
            },
          ]"
        />
      </template>
    </BasicTable>
    <MyPhaseCostModal @register="registerModal" />
    <MyPhaseEditModal @register="registerEditModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { pageApi, exportApi, removeApi } from '/@/api/projectPhaseCost/projectPhaseCost';
  import MyPhaseCostModal from './myPhaseCostModal.vue';
  import { columns, searchFormSchema } from './myPhaseCost.data';
  import { reactive } from 'vue';
  import { useModal } from '/@/components/Modal';
  import MyPhaseEditModal from './myPhaseEditModal.vue';
  import { ProjectOwnerStatusEnum } from '/@/enums/projectControl';
  import { useUserStore } from '/@/store/modules/user';

  const store = useUserStore();
  const [registerModal, { openModal }] = useModal();
  const [registerEditModal, { openModal: openEditModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: pageApi,
    searchInfo: {
      createBy: store.getUserInfo.account,
    },
    columns,
    formConfig: {
      labelWidth: 120,
      colon: true,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [
        ['date', ['startDate', 'endDate'], 'YYYY-MM-DD'],
        ['costSubmitTime', ['submitStartDate', 'submitEndDate'], 'YYYY-MM-DD'],
      ],
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

  // 编辑项目阶段成本明细 Modal
  const handleDetailModal = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: true,
    });
  };
  const handleEditModal = (record: Recordable) => {
    openEditModal(true, {
      record,
    });
  };
  const handleDelete = async (record: Recordable) => {
    try {
      await removeApi(record.id);
      message.success('删除成功');
      reload();
    } catch (error) {}
  };
  // 成功
  function handleSuccess() {
    reload();
  }

  // 导出
  const exportExcel = async () => {
    try {
      let params = selectId.toString();
      const res = await exportApi(params);
      const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
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
