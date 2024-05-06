<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="passTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './account.data';
  import { userResetApi } from '/@/api/sys/user';
  import { message } from 'ant-design-vue';
  const emits = defineEmits(['success', 'register']);
  const rowId = ref('');
  const passTitle = ref('');

  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });

    rowId.value = data.record.id;
    passTitle.value = data.record.account + ' - 修改密码';
    setFieldsValue({
      ...data.record,
    });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      await userResetApi(values);
      message.success('重置密码成功');
      closeModal();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
