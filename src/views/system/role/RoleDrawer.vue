<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { TreeItem } from '/@/components/Tree';
  import { addRoleApi, updateRoleApi } from '/@/api/sys/role';
  import { message } from 'ant-design-vue';

  const emits = defineEmits(['closeDrawer', 'success', 'register']);

  const isUpdate = ref(true);
  const treeData = ref<TreeItem[]>([]);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    // let params = {};
    if (unref(treeData).length === 0) {
      // treeData.value = (await getRoleList(params)) as any as TreeItem[];
    }
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));
  // 提交
  const handleSubmit = async () => {
    try {
      const values = await validate();
      if (!unref(isUpdate)) {
        await addRoleApi(values);
        message.success('新建角色成功');
      } else {
        await updateRoleApi(values);
        message.success('修改角色成功');
      }
      setDrawerProps({ confirmLoading: true });
      closeDrawer();
      emits('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  };
</script>
