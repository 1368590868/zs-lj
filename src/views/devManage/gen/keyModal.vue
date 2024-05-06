<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="一键修改"
    width="500px"
    @ok="handleSubmit"
  >
    <div>
      <BasicForm @register="registerFrom" />
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { message } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { genOneKeyApi } from '/@/api/codegen/gen';
  import { keyFormSchema } from './gen';
  //  子传父
  const emits = defineEmits(['success', 'register']);
  const [registerFrom, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    schemas: keyFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    console.log('data', data);
    setModalProps({ confirmLoading: false });
    setFieldsValue({ ...data.record });
  });
  const handleSubmit = async () => {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await genOneKeyApi(values);
      message.success('添加成功');

      closeModal();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>

<style scoped></style>
