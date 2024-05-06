<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #toolbar>
        <Button type="primary" @click="handleFlush" v-if="hasPermission(['sys_dict_type_add'])"
          >刷新缓存</Button
        >
        <Button type="primary" @click="handleCreate" v-if="hasPermission(['sys_dict_type_add'])"
          >新增</Button
        >
        <importFile
          @success="importExcel"
          title="导入"
          v-if="hasPermission(['sys_dict_type_import'])"
        />
        <Button type="primary" @click="exportExcel" v-if="hasPermission(['sys_dict_type_export'])">
          导出
        </Button>
        <!-- <Button type="primary"> 回收站 </Button> -->
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑字典',
              ifShow: hasPermission(['sys_dict_type_edit']),
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '配置',
              tooltip: '配置字典',
              ifShow: hasPermission(['sys_dict_data_list']),
              onClick: handleConfig.bind(null, record),
            },
            {
              icon: 'wpf:delete',
              color: 'error',
              tooltip: '删除字典',
              ifShow: hasPermission(['sys_dict_type_remove']),
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <DictDrawer @register="registerDrawer" @success="handleSuccess" />
    <ConfigDrawer
      @closeDrawer="closeDrawer"
      @success="handleSuccessConfig"
      :visible="configVisible"
      :drawer="drawerData"
    />
  </div>
</template>
<script lang="ts" setup>
  import { Button, message } from 'ant-design-vue';
  import { importFile } from '/@/components/System';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    listTypeDictApi,
    removeTypeDictApi,
    exportTypeDictApi,
    importTypeDictApi,
    flushTypeDictApi,
  } from '/@/api/sys/dictionary';
  import { useDrawer } from '/@/components/Drawer';
  import DictDrawer from './DictionaryDrawer.vue';
  import ConfigDrawer from './DictConfigDrawer.vue';
  import { columns, searchFormSchema } from './dict.data';
  import { reactive, ref } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '字典列表',
    api: listTypeDictApi,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
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
      width: 240,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });
  const { hasPermission } = usePermission();
  const configVisible = ref<boolean>(false);
  let selectId = reactive<any[]>([]);
  let drawerData = ref();
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
    await removeTypeDictApi(record.id);
    message.success('删除字典类型成功');
    reload();
  };
  function handleSuccess() {
    reload();
  }
  const closeDrawer = () => {
    configVisible.value = false;
  };
  function handleSuccessConfig() {
    reload();
  }
  // 打开字典配置
  const handleConfig = (record: Recordable) => {
    drawerData.value = record;
    configVisible.value = true;
  };
  // 导出
  const exportExcel = async () => {
    try {
      let params = selectId.toString();
      const res = await exportTypeDictApi(params);
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
      const res = await importTypeDictApi(params);
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
  // 刷新缓存
  const handleFlush = async () => {
    try {
      await flushTypeDictApi();
      message.success('刷新缓存成功');
      reload();
    } catch (error) {
      console.log(error);
    }
  };
</script>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '/dictionary',
  });
</script>
