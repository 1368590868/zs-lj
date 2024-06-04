<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    width="700px"
    @ok="handleSubmit"
    :show-cancel-btn="isUpdate"
  >
    <div>
      <BasicForm @register="registerFrom" v-show="isUpdate" />
      <div v-show="!isUpdate">审批意见: {{ data.auditOpinion }}</div>
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { computed, ref, unref, watchEffect } from 'vue';
  import { message } from 'ant-design-vue';
  import { formSchema } from './projectDetail.data';
  import { addApi } from '/@/api/projectAuditOpinion/projectAuditOpinion';
  import { useUserStore } from '/@/store/modules/user';
  const isUpdate = ref(true);
  const [registerFrom, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    labelWidth: 120,
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  const data = ref({ auditOpinion: '' });

  const emits = defineEmits(['success', 'register']);
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = data.isUpdate;
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.dataSource,
        auditOpinionFlag: 0,
      });
    } else {
      data.value = data.dataSource;
    }
    setFieldsValue({});
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '审批意见' : '管控意见填写'));

  watchEffect(() => {
    // 如果isUpdate变化，更新表达label
    const formSchemas = formSchema.map((item: FormSchema & any) => {
      if (item.field === 'auditOpinion') {
        item.label = unref(isUpdate) ? '管控意见' : '审批意见';
        item.componentProps!.placeholder = unref(isUpdate) ? '请输入管控意见' : '请输入审批意见';
      }
      return item;
    });
    updateSchema(formSchemas);
  });

  const userStore = useUserStore();
  const getUserInfo = computed(() => {
    const { nickName = '' } = userStore.getUserInfo || {};
    return nickName;
  });

  //   提交
  const handleSubmit = async () => {
    if (!isUpdate.value) return closeModal();
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await addApi({
        ...values,
        createByName: getUserInfo.value,
        auditOpinionFlag: 0,
        projectId: values.id,
      });
      message.success('添加成功');

      closeModal();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>

<style scoped></style>
