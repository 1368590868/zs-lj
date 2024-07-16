<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="审批意见"
    width="700px"
    @ok="handleSubmit"
    ok-text="关闭"
    :show-cancel-btn="false"
  >
    <div>
      <BasicForm @register="registerFrom" />
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { computed, ref, unref } from 'vue';
  import { formSchema } from './projectPhaseCost.data';

  const [registerFrom, { resetFields, setFieldsValue }] = useForm({
    colon: true,
    labelWidth: 120,
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  const isUpdate = ref(true);
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
    setFieldsValue({});
  });

  //   提交
  const handleSubmit = async () => {
    closeModal();
  };
</script>

<style scoped></style>
