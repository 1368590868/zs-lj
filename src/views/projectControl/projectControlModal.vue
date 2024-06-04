<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="完善项目信息"
    width="700px"
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
  import { formSchema } from './projectControl.data';
  import { ref, unref } from 'vue';
  import { addApi, editApi } from '/@/api/project/project';
  import { message } from 'ant-design-vue';

  const [registerFrom, { resetFields, setFieldsValue, validate }] = useForm({
    colon: true,
    labelWidth: 120,
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  const isUpdate = ref(true);
  const id = ref(null);
  const emits = defineEmits(['success', 'register']);
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    id.value = data.id;
    resetFields();
    setModalProps({ confirmLoading: false });
    setFieldsValue(data);
  });

  //   提交
  const handleSubmit = async () => {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();
      if (!isUpdate.value) {
        values.orderNum = Number(values.orderNum);
        await addApi(values);
        message.success('添加成功');
      } else {
        await editApi({ ...values, id: unref(id) });
        message.success('修改成功');
      }
      closeModal();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>

<style scoped></style>
