<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DataSourceTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable
      class="w-3/4 xl:w-4/5"
      @register="registerTable"
      :searchInfo="searchInfo"
      @selection-change="onSelectionChange"
    >
      <template #toolbar>
        <Button type="primary" @click="handleEditKey">一键修改</Button>
        <Button type="primary" @click="handleCloudList">生成</Button>
        <!-- <importFile title="导入" /> -->
        <!-- <Button type="primary">删除</Button> -->
        <!-- <Button type="primary"> 回收站 </Button> -->
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'carbon:view',
              tooltip: '预览',
              onClick: handlePreview.bind(null, record),
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
            {
              icon: 'ant-design:cloud-sync-outlined',
              tooltip: '同步',
              onClick: handleSync.bind(null, record),
            },
            {
              icon: 'codicon:cloud-download',
              tooltip: '生成代码',
              onClick: handleCloud.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <PreviewModal @register="registerModal" />
    <KeyModal @register="registerKeyModal" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { Button, message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { genListApi, genSyncTableApi, genCodeApi, genRemoveApi } from '/@/api/codegen/gen';
  // import { importFile } from '/@/components/System';
  import PreviewModal from './PreviewModal.vue';
  import { columns, searchFormSchema } from './gen';
  import { useModal } from '/@/components/Modal';
  import { useRouter } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { reactive, ref } from 'vue';
  import DataSourceTree from './dataSourceTree.vue';
  import KeyModal from './keyModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerKeyModal, { openModal: openKeyModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '表单列表',
    api: genListApi,
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
    rowSelection: {
      type: 'checkbox',
    },
    showIndexColumn: true,
    pagination: {
      current: 1,
      pageSize: 10,
    },
    actionColumn: {
      width: 200,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  const treeId = ref();
  const searchInfo = reactive<Recordable>({});
  const { replace } = useRouter();
  const handleEdit = (record: Recordable) => {
    replace({
      path: '/devManage/genConfig',
      query: { dsName: treeId.value, tableName: record.tableName },
    });
  };
  const handlePreview = (record: Recordable) => {
    openModal(true, {
      record,
      treeId: treeId.value,
    });
  };
  let selectId = reactive<any[]>([]);
  // 勾选事件触发
  const onSelectionChange = async (e) => {
    selectId = reactive<any[]>([]);
    e.rows.forEach((it) => {
      selectId.push(it.tableName);
    });
  };
  // 同步
  const handleSync = async (record: Recordable) => {
    try {
      let params = {
        dsName: treeId.value,
        tableName: record.tableName,
      };
      await genSyncTableApi(params);
      message.success('同步成功');
      reload();
    } catch (error) {
      console.log(error);
    }
  };
  // 删除
  const handleDelete = async (record: Recordable) => {
    try {
      let params = {
        dsName: treeId.value,
        tableName: record.tableName,
      };
      await genRemoveApi(params);
      message.success('删除成功');
      reload();
    } catch (error) {
      console.log(error);
    }
  };
  // 选择数据源李彪 刷新对应列表
  const handleSelect = (dataId = '') => {
    searchInfo.dsName = dataId;
    treeId.value = dataId;
    reload();
  };
  // 生成代码
  const handleCloud = async (record: Recordable) => {
    let tableList: any = [];
    tableList.push(record.tableName);
    try {
      let params = {
        dsName: treeId.value,
        tableName: tableList,
      };
      const res = await genCodeApi(params);
      const blob = new Blob([res.data], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      message.success('导出成功');
    } catch (error) {
      console.log(error);
    }
  };
  // 多选生成
  const handleCloudList = async () => {
    if (selectId.length != 0) {
      try {
        let params = {
          dsName: treeId.value,
          tableName: selectId,
        };
        const res = await genCodeApi(params);
        const blob = new Blob([res.data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        message.success('导出成功');
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error('至少选中一个');
    }
  };
  const handleEditKey = () => {
    if (selectId.length != 0) {
      try {
        let record = {
          dsName: treeId.value,
          tableName: selectId,
        };
        openKeyModal(true, {
          record,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error('至少选中一个');
    }
  };
</script>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '/gen',
  });
</script>

<style scoped></style>
