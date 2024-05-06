<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <ModuleSourceTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <div class="w-3/4 xl:w-4/5 ml-2">
      <Tabs size="small" v-model:activeKey="activeKey" @change="changeTabs">
        <TabPane key="Web" tab="Web">
          <BasicTable
            :columns="columns"
            :dataSource="configData"
            canResize
            :showIndexColumn="false"
            useSearchForm
            :TableSetting="false"
            :formConfig="formConfig"
            bordered
            rowKey="id"
            :handleSearchInfoFn="handleSearchInfoFn"
            :actionColumn="actionColumn"
          >
            <template #toolbar>
              <Button type="primary" @click="handleCreate" v-if="hasPermission(['sys_menu_add'])">
                新增
              </Button>
            </template>
            <template #action="{ record }">
              <TableAction
                :actions="[
                  {
                    icon: 'ic:sharp-radio-button-checked',
                    tooltip: '按钮权限',
                    ifShow: record.menuType === 'C',
                    onClick: handleBtn.bind(null, record),
                  },
                  {
                    icon: 'clarity:note-edit-line',
                    tooltip: '编辑菜单',
                    ifShow: hasPermission(['sys_menu_edit']),
                    onClick: handleEdit.bind(null, record),
                  },
                  {
                    icon: 'wpf:delete',
                    color: 'error',
                    tooltip: '删除菜单',
                    ifShow: hasPermission(['sys_menu_remove']),
                    popConfirm: {
                      title: '是否确认删除',
                      confirm: handleDelete.bind(null, record),
                    },
                  },
                ]"
              />
            </template>
          </BasicTable>
        </TabPane>
        <TabPane key="APP" tab="APP">
          <BasicTable
            :columns="columns"
            :dataSource="configData"
            canResize
            :showIndexColumn="false"
            useSearchForm
            :formConfig="formConfig"
            bordered
            rowKey="id"
            :handleSearchInfoFn="handleSearchInfoFn"
            :actionColumn="actionColumn"
          >
            <template #toolbar>
              <Button type="primary" @click="handleCreate" v-if="hasPermission(['sys_menu_add'])">
                新增
              </Button>
            </template>
            <template #action="{ record }">
              <TableAction
                :actions="[
                  {
                    icon: 'ic:sharp-radio-button-checked',
                    tooltip: '按钮权限',
                    ifShow: record.menuType === 'C',
                    onClick: handleBtn.bind(null, record),
                  },
                  {
                    icon: 'clarity:note-edit-line',
                    tooltip: '编辑菜单',
                    ifShow: hasPermission(['sys_menu_edit']),
                    onClick: handleEdit.bind(null, record),
                  },
                  {
                    icon: 'wpf:delete',
                    color: 'error',
                    tooltip: '删除菜单',
                    ifShow: hasPermission(['sys_menu_remove']),
                    popConfirm: {
                      title: '是否确认删除',
                      confirm: handleDelete.bind(null, record),
                    },
                  },
                ]"
              />
            </template>
          </BasicTable>
        </TabPane>
      </Tabs>
    </div>
    <MenuDrawer
      @register="registerDrawer"
      :activeKey="activeKey"
      @success="handleSuccess"
      @edit="handleEdit"
    />
    <BtnModal @register="registerModal" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { Tabs, TabPane, message, Button } from 'ant-design-vue';
  import MenuDrawer from './MenuDrawer.vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import BtnModal from './BtnModal.vue';
  import { columns, searchFormSchema } from './menu.data';
  import { getMenuList, delMenu } from '/@/api/sys/menu';
  import { useDrawer } from '/@/components/Drawer';
  import { PageWrapper } from '/@/components/Page';
  import ModuleSourceTree from './moduleSourceTree.vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { ref } from 'vue';
  import { useModal } from '/@/components/Modal';
  const activeKey = ref('Web');
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerModal, { openModal }] = useModal();
  const modelKey = ref();

  const actionColumn = ref({
    width: 120,
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
    fixed: undefined,
  });
  const formConfig: any = ref({
    labelWidth: 70,
    autoSubmitOnEnter: true,
    schemas: searchFormSchema,
    submitButtonOptions: handleSearchInfoFn,
  });
  const configData = ref();
  const { hasPermission } = usePermission();

  // 菜单表格
  const listTable = async (menuName) => {
    let params = {
      menuName,
      type: activeKey.value,
      modelKey: modelKey.value,
      size: 100,
      current: 1,
      pages: 1,
    };
    const res = await getMenuList(params);
    configData.value = res.records;
  };
  const handleCreate = () => {
    openDrawer(true, {
      isUpdate: false,
      modelKey: modelKey.value,
      typeKey: activeKey.value,
    });
  };
  const handleEdit = (record: Recordable) => {
    openDrawer(true, {
      record,
      isUpdate: true,
      modelKey: modelKey.value,
      typeKey: activeKey.value,
    });
  };
  // 按钮权限
  const handleBtn = (record: Recordable) => {
    openModal(true, {
      record,
    });
  };

  // 选择对应模块 刷新对应列表
  const handleSelect = (item) => {
    modelKey.value = item;
    listTable('');
  };
  const handleSuccess = () => {
    listTable('');
  };
  const changeTabs = () => {
    listTable('');
  };
  const handleDelete = async (record: Recordable) => {
    const { id } = record;
    await delMenu(id);
    message.success('删除成功');
    listTable('');
  };
  function handleSearchInfoFn(info) {
    listTable(info.menuName);
  }
</script>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '/menu',
  });
</script>
