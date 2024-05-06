<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable
      @register="registerTable"
      class="w-3/4 xl:w-4/5"
      :searchInfo="searchInfo"
      @selection-change="onSelectionChange"
    >
      <template #toolbar>
        <Button type="primary" @click="handleCreateUser" v-if="hasPermission(['sys_user_add'])"
          >新增</Button
        >
        <importFile @success="importExcel" title="导入" v-if="hasPermission(['sys_user_import'])" />
        <Button type="primary" @click="exportExcel" v-if="hasPermission(['sys_user_export'])"
          >导出</Button
        >
        <Button type="primary" @click="handleRecycling">回收站</Button>
      </template>
      <template #avatar="{ record }">
        <Avatar :size="30" :src="record.avatar" />
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑此账号',
              ifShow: hasPermission(['sys_user_edit']),
              onClick: handleView.bind(null, record),
            },
            {
              icon: 'wpf:delete',
              color: 'error',
              tooltip: '删除此账号',
              ifShow: hasPermission(['sys_user_remove']),
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
          :dropDownActions="[
            {
              label: '重置密码',
              ifShow: hasPermission(['sys_user_reset']),
              onClick: handleUpdatePwd.bind(null, record),
            },
            {
              label: '冻结用户',
              ifShow: (_action) => {
                return record.lockFlag === 0 && hasPermission(['sys_user_frozen']); // 根据业务控制是否显示: 非enable状态的不显示启用按钮
              },
              popConfirm: {
                title: '是否确认冻结',
                confirm: handleFrozen.bind(null, record),
              },
            },
            {
              label: '解冻用户',
              ifShow: (_action) => {
                return record.lockFlag === 1 && hasPermission(['sys_user_thaw']); // 根据业务控制是否显示: 非enable状态的不显示启用按钮
              },
              popConfirm: {
                title: '是否确认解冻',
                confirm: handleThaw.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" />
    <AccountDrawer @register="registerDrawer" @success="handleSuccess" />
    <!-- <DeptDrawer @register="deptDrawer" @success="handleDeptSuccess" /> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { Button, Avatar, message } from 'ant-design-vue';
  import { importFile } from '/@/components/System';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    getUserListApi,
    userFrozenApi,
    userRemoveApi,
    userThawApi,
    exportUserApi,
    importUserApi,
  } from '/@/api/sys/user';
  import { PageWrapper } from '/@/components/Page';
  import DeptTree from './DeptTree.vue';
  import { useModal } from '/@/components/Modal';
  import AccountModal from './AccountModal.vue';
  import AccountDrawer from './AccountDrawer.vue';
  import { columns, searchFormSchema } from './account.data';
  import { useDrawer } from '/@/components/Drawer';
  import { router } from '/@/router';
  import { usePermission } from '/@/hooks/web/usePermission';

  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  let selectId = reactive<any[]>([]);
  const [registerTable, { reload }] = useTable({
    title: '账号列表',
    api: getUserListApi,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 50,
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
  const { hasPermission } = usePermission();
  const [registerDrawer, { openDrawer }] = useDrawer();
  // 删除用户
  const handleDelete = async (record: Recordable) => {
    await userRemoveApi(record.id);
    reload();
    message.success('删除用户成功');
  };
  // 冻结用户
  const handleFrozen = async (record: Recordable) => {
    await userFrozenApi(record.id);
    reload();
    message.success('冻结用户成功');
  };

  // 解冻用户
  const handleThaw = async (record: Recordable) => {
    await userThawApi(record.id);
    reload();
    message.success('解冻用户成功');
  };
  // 新增用户成功 刷新列表
  const handleSuccess = () => {
    reload();
  };
  // 选择部门 刷新对应列表
  const handleSelect = (deptId = '') => {
    searchInfo.deptId = deptId;
    reload();
  };
  // 修改用户详情
  const handleView = (record: Recordable) => {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  };
  // 创建用户
  const handleCreateUser = () => {
    openDrawer(true, {
      isUpdate: false,
    });
  };
  // 修改用户密码
  const handleUpdatePwd = (record: Recordable) => {
    openModal(true, {
      record,
    });
  };
  // 回收站
  const handleRecycling = () => {
    router.push('/system/recycling');
  };
  // 导出
  const exportExcel = async () => {
    try {
      let params = selectId.toString();
      const res = await exportUserApi(params);
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
      const res = await importUserApi(params);
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
    console.log('selectId', selectId);
  };
</script>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '/user',
  });
</script>
