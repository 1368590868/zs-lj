<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="配置角色"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicTree
      ref="treeRef"
      :treeData="treeData"
      :replaceFields="{ title: 'roleName', key: 'id' }"
      checkable
      toolbar
      search
      show-icon
      title="角色配置"
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      v-model:checkedKeys="checkedKeys"
    />
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
    </div>
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { message } from 'ant-design-vue';
  import { reactive, ref, unref } from 'vue';
  import { drawerItem } from './account.data';
  import { getRoleListApi } from '/@/api/sys/role';
  import { userAuthRoleApi } from '/@/api/sys/user';
  import { useDrawerInner, BasicDrawer } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { TreeActionType } from '/@/components/Tree';
  const treeData = ref<TreeItem[]>([]);
  const expandedKeys = ref<string[]>();
  const selectedKeys = ref<string[]>();
  const checkedKeys = ref<string[]>();
  // 定义tree 获取选中节点
  const treeRef = ref<Nullable<TreeActionType>>(null);
  // 新增、编辑
  let menuDetail = reactive<drawerItem>({});
  //  子传父
  const emits = defineEmits(['success', 'register']);

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false });
    menuDetail.userId = data.record.id;
    expandedKeys.value = data.record.roleIds;
    selectedKeys.value = data.record.roleIds;
    checkedKeys.value = data.record.roleIds;
    getTreeApi();
  });
  // 提交
  const handleSubmit = async () => {
    const keys = getTree().getCheckedKeys();
    if (Object.keys(keys).length === 0) {
      message.error('请选择角色');
      return;
    }
    let params = {
      userId: menuDetail.userId,
      roleIds: keys,
    };
    await userAuthRoleApi(params);
    message.success('保存成功');
    closeDrawer();
    emits('success');
  };
  // 上级单位下拉树
  const getTreeApi = async () => {
    let params = {
      current: 1,
      size: 10000,
    };
    const res = await getRoleListApi(params);
    treeData.value = res.records as any as TreeItem[];
  };

  // tree方法调用
  const getTree = () => {
    let tree = unref(treeRef);
    if (!tree) {
      throw new Error('tree is null');
    }
    return tree;
  };
</script>
