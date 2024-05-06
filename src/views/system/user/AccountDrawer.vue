<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @close="handleClose"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #roleIds="{ model }">
        <a-button @click="handleRoleModal(model)">配置角色</a-button>
      </template>
      <template #tenantIds="{ model }">
        <a-button @click="handleTenantModal(model)">配置租户</a-button>
      </template>
    </BasicForm>
  </BasicDrawer>
  <Modal v-model:visible="passVisible" title="默认密码" @ok="handleOk">
    <p class="pl-10 pt-4">密码: {{ passText }}</p>
  </Modal>
  <DeptModal @register="registerModal" @success="handleSuccess" />
  <TenantModal @register="registerTenAntModal" @success="handleTenantSuccess" />
</template>
<script lang="ts" setup>
  import { computed, ref, unref, toRaw } from 'vue';
  import { message, Modal } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './account.data';
  import DeptModal from './DeptModal.vue';
  import TenantModal from './TenantModal.vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { getUserDetailApi, userAddApi, userEditApi } from '/@/api/sys/user';
  import { deptTreeApi } from '/@/api/sys/dept';
  import { TreeItem } from '/@/components/Tree';
  import { useModal } from '/@/components/Modal';
  import { useUserStore } from '/@/store/modules/user';
  const emit = defineEmits(['register', 'success']);
  const treeData = ref<TreeItem[]>([]);
  const userStore = useUserStore();
  const [registerModal, { openModal }] = useModal();
  const [registerTenAntModal, { openModal: openTenantModal }] = useModal();
  const isUpdate = ref(true);
  const passVisible = ref(false);
  const passText = ref();

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 90,
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    userStore.setRoleClear('1');
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      const res = await getUserDetailApi(data.record.id);
      setFieldsValue({
        ...res,
      });
    }
    treeData.value = (await deptTreeApi({})) as unknown as TreeItem[];
    updateSchema({
      field: 'deptId',
      componentProps: { treeData },
    });
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '新增用户' : '编辑用户'));
  // 提交
  const handleSubmit = async () => {
    try {
      const values = await validate();
      let params = {
        ...values,
        modelIds: toRaw(values.modelIds),
      };
      setDrawerProps({ confirmLoading: true });
      // TODO custom api
      if (!isUpdate.value) {
        const res = await userAddApi(params);
        passVisible.value = true;
        passText.value = res;
        message.success('用户新增成功');
      } else {
        await userEditApi(params);
        message.success('用户修改成功');
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  };
  // 密码框关闭
  const handleOk = () => {
    passVisible.value = false;
  };
  // 打开配置角色
  const handleRoleModal = (record) => {
    openModal(true, {
      record,
    });
  };
  // 打开配置租户
  const handleTenantModal = (record) => {
    openTenantModal(true, {
      record,
    });
  };
  // 配置角色返参
  const handleSuccess = (roleId) => {
    setFieldsValue({
      roleIds: roleId,
    });
  };
  // 配置租户返参
  const handleTenantSuccess = (tenantId) => {
    setFieldsValue({
      tenantIds: tenantId,
    });
  };
  // 关闭后
  const handleClose = () => {
    userStore.setRoleClear('1');
  };
</script>
