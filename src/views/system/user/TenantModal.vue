<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="配置租户"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicTree
      ref="treeRef"
      :treeData="treeData"
      :replaceFields="{ title: 'name', key: 'id' }"
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
  </BasicModal>
</template>
<script setup lang="ts">
  import { message } from 'ant-design-vue';
  import { reactive, ref, unref } from 'vue';
  import { drawerItem } from './account.data';
  import { sysTenantTListApi } from '/@/api/tenant/manager';
  import { useModalInner, BasicModal } from '/@/components/Modal';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { TreeActionType } from '/@/components/Tree';
  const treeData = ref<TreeItem[]>([]);
  const expandedKeys = ref<string[]>();
  const selectedKeys = ref<string[]>();
  const tenantIds = ref<string[]>();
  const checkedKeys = ref<string[]>();
  // 定义tree 获取选中节点
  const treeRef = ref<Nullable<TreeActionType>>(null);
  // 新增、编辑
  let menuDetail = reactive<drawerItem>({});
  //  子传父
  const emits = defineEmits(['success', 'register']);

  const [registerDrawer, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    tenantIds.value = data.record.tenantIds;
    menuDetail.userId = data.record.id;
    expandedKeys.value = tenantIds.value || data.record.tenantIds;
    selectedKeys.value = tenantIds.value || data.record.tenantIds;
    checkedKeys.value = tenantIds.value || data.record.tenantIds;
    getTreeApi();
  });
  // 提交
  const handleSubmit = async () => {
    const keys: any = getTree().getCheckedKeys();
    if (Object.keys(keys).length === 0) {
      message.error('请选择租户');
      return;
    }
    tenantIds.value = keys;
    message.success('保存成功');
    closeModal();
    emits('success', tenantIds.value);
  };
  // 上级单位下拉树
  const getTreeApi = async () => {
    const res = await sysTenantTListApi();
    treeData.value = res;
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
