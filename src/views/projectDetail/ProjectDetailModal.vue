<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    width="700px"
    @ok="handleSubmit"
    :ok-text="!isUpdate ? '关闭' : '提交'"
    :show-cancel-btn="isUpdate"
  >
    <div>
      <BasicForm @register="registerFrom" v-show="isUpdate" />
      <div v-show="!isUpdate">
        <div v-for="item of detail" :key="item.id" class="flex justify-between">
          <span>{{ item.createByName }}: {{ item.auditOpinion }}</span>
          <span class="text-xs">{{ item.createTime }}</span>
        </div></div
      >
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { computed, ref, unref, watchEffect } from 'vue';
  import { message } from 'ant-design-vue';
  import { formSchema } from './projectDetail.data';
  import { useUserStore } from '/@/store/modules/user';
  import { pageApi } from '/@/api/projectAuditOpinion/projectAuditOpinion';
  import { editApi } from '/@/api/project/project';
  import { useProjectControl } from '/@/store/modules/projectControl';

  const isUpdate = ref(true);
  const [registerFrom, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    labelWidth: 120,
    colon: true,
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  const emits = defineEmits(['success', 'register']);
  const detail = ref<Recordable[]>([]);
  const projectStore = useProjectControl();

  const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = data.isUpdate;
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.dataSource,
        auditOpinionFlag: 0,
        auditOpinion: projectStore.projectRow?.remark?.split(':')[1] ?? '',
      });
    } else {
      setModalProps({ confirmLoading: true });
      const projectPhaseCostId = data.record.id;
      // 获取审批意见详情
      const res = await pageApi({ projectPhaseCostId }).finally(() => {
        setModalProps({ confirmLoading: false });
      });
      detail.value = res.records;
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
      await editApi({
        id: values.id,
        remark: `${getUserInfo.value} : ${values.auditOpinion}`,
      });
      projectStore.setProjectRow({ remark: `${getUserInfo.value} : ${values.auditOpinion}` });
      // await addApi({
      //   ...values,
      //   createByName: getUserInfo.value,
      //   auditOpinionFlag: 0,
      //   projectId: values.id,
      // });
      message.success('添加成功');

      closeModal();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>

<style scoped></style>
