<template>
  <BasicTable @register="registerTable" :searchInfo="searchInfo">
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
</template>

<script setup lang="ts">
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { columns, searchFormSchema } from '../menu.data';
  import { getMenuList, delMenu } from '/@/api/sys/menu';
  import { message } from 'ant-design-vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { reactive, watch } from 'vue';
  import { Button } from 'ant-design-vue';
  const props = defineProps({ modelKey: String, type: String });
  const { hasPermission } = usePermission();
  const [registerTable, { reload }] = useTable({
    title: '菜单列表',
    api: getMenuList,
    columns,
    formConfig: {
      labelWidth: 70,
      autoSubmitOnEnter: true,
      schemas: searchFormSchema,
    },
    isTreeTable: true,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    immediate: false,
    showIndexColumn: false,
    beforeFetch: (params) => {
      let params1 = {
        ...params,
        type: props.type,
        modelKey: props.modelKey,
      };
      return params1;
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });
  const emits = defineEmits(['create', 'edit', 'btn']);
  const handleCreate = () => {
    let type = props.type;
    emits('create', type);
  };
  const handleEdit = (record: Recordable) => {
    emits('edit', record);
  };
  const handleBtn = (record: Recordable) => {
    emits('btn', record);
  };
  const handleDelete = async (record: Recordable) => {
    const { id } = record;
    await delMenu(id);
    message.success('删除成功');
    reload();
  };
  defineExpose({ reload });
  const searchInfo = reactive<Recordable>({});
  watch(
    () => [props.type, props.modelKey],
    () => {
      searchInfo.modelKey = props.modelKey;
      reload();
    },
    {
      deep: true,
    },
  );
</script>

<style scoped></style>
