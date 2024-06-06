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
  import { addAndUpdatePersonCostApi } from '/@/api/projectPhaseCost/projectPhaseCost';

  const [registerFrom, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    schemas: [
      {
        label: '人力成本',
        field: 'phaseBudget',
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
        label: 'monthAuditId',
        field: 'monthAuditId',
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
      monthAuditId: data.record.id,
    });
  });

  //   提交
  const handleSubmit = async () => {
    const values = await validate();
    await addAndUpdatePersonCostApi({ ...values, id: values.id });
    closeModal();
  };
</script>

<style lang="less" scoped>
  :global(.ant-input-number) {
    width: 100%;
  }
</style>
