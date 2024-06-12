<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
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
  import { formSchema } from './projectPhase.data';
  import { computed, ref, unref } from 'vue';
  import { addApi, editApi } from '/@/api/projectPhase/projectPhase';
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
  const emits = defineEmits(['success', 'register']);
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
  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  //   提交
  const handleSubmit = async () => {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (!isUpdate.value) {
        values.orderNum = Number(values.orderNum);
        await addApi(values);
        message.success('添加成功');
      } else {
        await editApi(values);
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
