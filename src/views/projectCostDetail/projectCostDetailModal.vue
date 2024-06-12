<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    width="700px"
    @ok="handleSubmit"
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
  import { formSchema } from './projectCostDetail.data';
  import { computed, ref, unref } from 'vue';

  const [registerFrom, { resetFields, setFieldsValue }] = useForm({
    labelWidth: 120,
    colon: true,
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
  const getTitle = computed(() => '审批意见');

  //   提交
  const handleSubmit = async () => {
    closeModal();
  };
</script>

<style scoped></style>
