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
  import { computed, reactive, ref, unref } from 'vue';
  import { message } from 'ant-design-vue';
  import { formSchema } from './projectDetail.data';
  import { addApi } from '/@/api/projectAuditOpinion/projectAuditOpinion';

  const [registerFrom, { resetFields, setFieldsValue, validate }] = useForm({
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
    console.log(data.dataSource);
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.dataSource,
        auditOpinionFlag: 0,
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

      await addApi(values);
      message.success('添加成功');

      closeModal();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>

<style scoped></style>
