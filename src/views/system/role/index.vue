<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="onSelectionChange">
      <template #toolbar>
        <Button type="primary" @click="handleCreate" v-if="hasPermission(['sys_role_add'])">
          新增
        </Button>
        <importFile @success="importExcel" title="导入" v-if="hasPermission(['sys_role_import'])" />
        <Button type="primary" @click="exportExcel" v-if="hasPermission(['sys_role_export'])">
          导出
        </Button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '分配用户',
              onClick: handleUser.bind(null, record),
            },
            {
              label: '分配菜单',
              ifShow: hasPermission(['sys_role_list']),
              onClick: handleMenu.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑角色',
              ifShow: hasPermission(['sys_role_edit']),
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'wpf:delete',
              color: 'error',
              tooltip: '删除角色',
              ifShow: hasPermission(['sys_role_remove']),
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
    <MenuDrawer @register="menuDrawer" @success="handleSuccess" />
    <UserModal @register="userModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { Button, message } from 'ant-design-vue';
  import { importFile } from '/@/components/System';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRoleListApi, delRoleApi, exportRoleApi, importRoleApi } from '/@/api/sys/role';
  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';
  import MenuDrawer from './MenuDrawer.vue';
  import UserModal from './UserModal.vue';
  import { columns, searchFormSchema } from './role.data';
  import { cloneDeep } from 'lodash-es';
  import { reactive } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useModal } from '/@/components/Modal';
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [userModal, { openModal }] = useModal();
  const [menuDrawer, { openDrawer: openMenu }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '角色列表',
    api: getRoleListApi,
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
      width: 240,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });
  const { hasPermission } = usePermission();
  let selectId = reactive<any[]>([]);
  // 创建角色
  const handleCreate = () => {
    openDrawer(true, {
      isUpdate: false,
    });
  };
  // 编辑角色
  const handleEdit = (record: Recordable) => {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  };
  // 删除角色
  const handleDelete = async (record: Recordable) => {
    await delRoleApi(record.id);
    message.success('删除角色成功');
    reload();
  };
  // 成功
  function handleSuccess() {
    reload();
  }
  // 打开菜单分配
  const handleMenu = (record: Recordable) => {
    let res = cloneDeep(record);
    openMenu(true, {
      record: res,
      isUpdate: true,
    });
  };
  // 打开用户分配
  const handleUser = (record: Recordable) => {
    openModal(true, {
      record: record,
    });
  };
  // excel导入
  const importExcel = async (e) => {
    try {
      let params = {
        file: e,
      };
      const res = await importRoleApi(params);
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
      const res = await exportRoleApi(params);
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
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '/role',
  });
</script>
