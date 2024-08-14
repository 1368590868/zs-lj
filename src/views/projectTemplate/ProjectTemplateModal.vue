<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="项目管控模板编制"
    width="700px"
    @ok="handleSubmit"
  >
    <div>
      <BasicForm @register="registerFrom">
        <template #phaseBudgetRatio="{ model, field }">
          <InputNumbers
            v-if="getVisible"
            :min="0"
            :max="100"
            :getFieldsValue="getFieldsValue"
            :setFieldsValue="setFieldsValue"
            v-model:value="model[field]"
          />
        </template>
      </BasicForm>
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './projectTemplate.data';
  import { computed, ref, unref } from 'vue';
  import { addApi, editApi } from '/@/api/projectTemplate/projectTemplate';
  import { message } from 'ant-design-vue';
  import InputNumbers from './component/InputNumbers';
  import { useUserStore } from '/@/store/modules/user';

  const [registerFrom, { resetFields, setFieldsValue, validate, getFieldsValue }] = useForm({
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
  const [register, { setModalProps, closeModal, getVisible }] = useModalInner((data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
    setFieldsValue({});
  });

  const userStore = useUserStore();

  const getUserInfo = computed(() => {
    const { nickName = '' } = userStore.getUserInfo || {};
    return { nickName };
  });

  //   提交
  const handleSubmit = async () => {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // 阶段预算不能为0
      if (values.phaseBudgetRatio.some((item) => item === 0)) {
        message.error('阶段预算比例不能为0%');
        return;
      }
      // 阶段预算比例相加等于100
      const sum = values.phaseBudgetRatio.reduce((prev, next) => prev + next, 0);
      if (sum !== 100) {
        message.error('阶段预算比例相加必须等于100%');
        return;
      }

      if (values?.professionTypes) {
        const professionTypes = values.professionTypes.split('-');
        if (professionTypes.length === 2) {
          values.professionType = professionTypes[1];
          values.businessType = professionTypes[0];
        } else {
          values.professionType = professionTypes[0];
        }
        Reflect.deleteProperty(values, 'professionTypes');
      }

      await addApi({
        createByName: getUserInfo.value.nickName,
        ...values,
        phaseBudgetRatio: JSON.stringify(values.phaseBudgetRatio),
      });
      message.success('添加成功');

      closeModal();
      resetFields();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>

<style scoped>
  :global(.ant-input-number) {
    width: 92%;
  }
</style>
