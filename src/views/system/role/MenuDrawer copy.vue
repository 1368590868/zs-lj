<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="菜单分配"
    width="800px"
    @ok="handleSubmit"
  >
    <Tabs size="small" v-model:activeKey="activeKey" @change="handleCheckTabs">
      <TabPane key="WEB" tab="Web">
        <div class="flex">
          <BasicTree
            ref="treeRef"
            class="w-2/5"
            :treeData="treeData"
            :replaceFields="{ title: 'label', key: 'id' }"
            checkable
            search
            toolbar
            title="菜单分配"
            @check="onCheck"
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            v-model:checkedKeys="checkedKeys"
          />
          <BasicTable class="w-3/5" @register="registerTable" />
        </div>
      </TabPane>
      <TabPane key="APP" tab="App">
        <BasicTree
          ref="treeRef"
          :treeData="treeData"
          :replaceFields="{ title: 'label', key: 'id' }"
          checkable
          search
          toolbar
          title="菜单分配"
          @check="onCheck"
          v-model:expandedKeys="expandedKeys"
          v-model:selectedKeys="selectedKeys"
          v-model:checkedKeys="checkedKeys"
      /></TabPane>
    </Tabs>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getMenuTreeList } from '/@/api/sys/menu';
  import { saveAuthMenuApi } from '/@/api/sys/role';
  import { filter } from '/@/utils/helper/treeHelper';
  import { cloneDeep } from 'lodash-es';
  import { menuColumns } from './role.data';
  import { message, Tabs, TabPane } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { modelKeyEnum } from '/@/enums/moduleEnum';
  const emits = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const treeData = ref<TreeItem[]>([]);
  const selectTree = ref();
  const expandedKeys = ref<string[]>();
  const selectedKeys = ref<string[]>();
  const checkedKeys = ref<string[]>();
  let menuId = ref();
  const activeKey = ref('WEB');
  const activeData = ref();
  const [registerTable, {}] = useTable({
    title: '角色列表',
    columns: menuColumns,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    activeData.value = data;
    menuData();
  });
  const menuData = async () => {
    // modelKey 根据自己项目
    treeData.value = (await getMenuTreeList({
      type: activeKey.value,
      modelKey: modelKeyEnum.KEY,
    })) as any as TreeItem[];
    selectTree.value = activeData.value.record.menuIds; // 防止未选择提交
    // 1、转换一维数组
    let oneDimensional = requestList(treeData.value);
    // 2、后端返回的数组
    let newData = cloneDeep(activeData.value.record.menuIds);
    // 3、筛选出父节点
    let uniqueChild = uniqueTree(newData, oneDimensional);
    isUpdate.value = !!activeData.value?.isUpdate;
    menuId.value = activeData.value.record.id;
    expandedKeys.value = uniqueChild;
    selectedKeys.value = uniqueChild;
    checkedKeys.value = uniqueChild;
  };

  async function handleSubmit() {
    try {
      if (selectTree.value.length == 0) {
        message.error('请至少选一个');
        return;
      }
      let params = {
        roleId: menuId.value,
        menuIds: selectTree.value,
        type: activeKey.value,
      };
      await saveAuthMenuApi(params);
      closeDrawer();
      emits('success');
    } finally {
      filter;
      setDrawerProps({ confirmLoading: false });
    }
  }
  let testData: any = reactive([]); //test存放所有子节点的数组
  //第一步骤：子节点放在一个数组中
  const requestList = (data) => {
    data &&
      data.map((item) => {
        if (item.children && item.children.length > 0) {
          requestList(item.children);
        } else {
          testData.push(item.id);
        }
        return null;
      });
    return testData;
  };

  //第2 筛选后父节点
  const uniqueTree = (uniqueArr, Arr) => {
    let uniqueChild: any = [];
    for (var i in Arr) {
      for (var k in uniqueArr) {
        if (uniqueArr[k] === Arr[i]) {
          uniqueChild.push(uniqueArr[k]);
        }
      }
    }
    return uniqueChild;
  };
  const onCheck = (checkedKeys, e) => {
    //注意：halfCheckedKeys 是没有全部勾选状态下的父节点
    let concatTreeData = checkedKeys.concat(e.halfCheckedKeys);
    selectTree.value = concatTreeData;
  };
  const handleCheckTabs = () => {
    menuData();
  };
</script>
