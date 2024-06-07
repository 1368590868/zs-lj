<template>
  <BasicModal v-bind="$attrs" @register="register" title="编辑" width="700px" @ok="handleSubmit">
    <div>
      <BasicForm @register="registerFrom" />
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { editApi } from '/@/api/projectPhaseCost/projectPhaseCost';
  import { formEditSchema } from './projectPhaseCostDetail.data';

  const [registerFrom, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    schemas: formEditSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    setModalProps({ confirmLoading: false });

    setFieldsValue({
      ...data.record,
    });
  });

  //   提交
  const handleSubmit = async () => {
    const values = await validate();
    await editApi({ ...values, id: values.id });
    closeModal();
  };
</script>

<style lang="less" scoped>
  :global(.ant-input-number) {
    width: 100%;
  }
</style>
