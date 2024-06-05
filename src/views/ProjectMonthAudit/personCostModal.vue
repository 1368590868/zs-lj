<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="人力成本"
    width="500px"
    @ok="handleSubmit"
  >
    <div>
      <BasicForm @register="registerFrom" />
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { editApi } from '/@/api/projectPhaseCost/projectPhaseCost';
  import { formEditSchema } from './ProjectMonthAudit.data';

  const [registerFrom, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    schemas: [
      {
        label: '人力成本',
        field: 'personCost',
        component: 'InputNumber',
        labelWidth: 80,
        componentProps: {
          precision: 2,
          min: 0,
        },
        suffix: '元',
        required: true,
      },
      {
        label: 'id',
        field: 'id',
        component: 'Input',
        show: false,
      },
    ],
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
