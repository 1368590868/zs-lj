<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      >
      <template #avatar="{ record }">
        <Avatar :size="30" :src="record.avatar" />
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { Avatar } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { userRecoveryListApi } from '/@/api/sys/user';
  import { PageWrapper } from '/@/components/Page';
  import DeptTree from './DeptTree.vue';
  import { columns, searchFormSchema } from './account.data';

  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload }] = useTable({
    title: '回收站账号列表',
    api: userRecoveryListApi,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 50,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn(info) {
      return info;
    },
  });

  // 选择部门 刷新对应列表
  function handleSelect(deptId = '') {
    searchInfo.deptId = deptId;
    reload();
  }
</script>
