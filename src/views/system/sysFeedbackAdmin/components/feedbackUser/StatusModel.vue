<template>
  <BasicModal
    :minHeight="30"
    v-bind="$attrs"
    @register="registerModal"
    title="状态"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { StatusFormSchema } from './sysFeedback.data';
  import { message } from 'ant-design-vue';
  import { operationApi } from '/@/api/sys/sysFeedback';

  const emits = defineEmits(['success', 'register']);

  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 80,
    schemas: StatusFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 20,
    },
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    setFieldsValue({
      id: data.record.id,
      state: data.record.state,
    });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      await operationApi(values);
      setModalProps({ confirmLoading: true });
      // TODO custom api
      message.success('处理成功');
      closeModal();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
