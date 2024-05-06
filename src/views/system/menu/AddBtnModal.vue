<template>
  <BasicModal width="400px" title="新增按钮" v-bind="$attrs" @register="registerModal">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { formBtnSchema } from './menu.data';
  import { BasicForm, useForm } from '/@/components/Form';

  const [registerForm, {}] = useForm({
    labelWidth: 100,
    schemas: formBtnSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });
  const [registerModal, { setModalProps }] = useModalInner(async () => {
    setModalProps({ confirmLoading: false });
  });
</script>
